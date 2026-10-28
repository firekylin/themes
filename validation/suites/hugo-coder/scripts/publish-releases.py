#!/usr/bin/env python3
"""Publish new immutable theme release assets and verify existing ones."""
import base64
import hashlib
import json
import os
import re
import subprocess
import tempfile
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parent.parent
REPOSITORY = 'firekylin/themes'


def publish(item, target, root=ROOT, run=subprocess.run):
    url = urlparse(item['download'])
    parts = url.path.split('/')
    if (url.scheme != 'https' or url.netloc != 'github.com' or url.query or url.fragment or
            len(parts) != 7 or parts[1:5] != ['firekylin', 'themes', 'releases', 'download']):
        raise ValueError('Invalid theme release URL')
    tag, filename = map(unquote, parts[5:7])
    if (not re.fullmatch(r'[a-zA-Z0-9][a-zA-Z0-9._-]*', item['id']) or
            not re.fullmatch(r'\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?', item['version']) or
            tag != f"{item['id']}-v{item['version']}" or filename != f"{item['id']}-{item['version']}.zip"):
        raise ValueError('Release URL does not match theme identity')
    archive = root / 'dist' / filename
    digest = 'sha512-' + base64.b64encode(hashlib.sha512(archive.read_bytes()).digest()).decode('ascii')
    if digest != item['integrity']:
        raise ValueError('Generated archive does not match registry')
    cmd = ['gh', 'release', 'view', tag, '--repo', REPOSITORY, '--json', 'assets']
    existing = run(cmd, capture_output=True, text=True)
    if existing.returncode:
        run(['gh', 'release', 'create', tag, str(archive), '--repo', REPOSITORY, '--target', target,
             '--title', f"{item['title']} {item['version']}", '--notes', 'Firekylin theme archive.'], check=True)
        return
    names = [asset['name'] for asset in json.loads(existing.stdout)['assets']]
    if filename not in names:
        raise ValueError('Existing release is missing its asset; resolve it manually')
    with tempfile.TemporaryDirectory(prefix='firekylin-release-') as tmp:
        run(['gh', 'release', 'download', tag, '--repo', REPOSITORY, '--pattern', filename, '--dir', tmp], check=True)
        released = Path(tmp, filename).read_bytes()
        if not hashlib.sha512(released).digest() == hashlib.sha512(archive.read_bytes()).digest():
            raise ValueError('Existing release differs; increment the theme version')


def main():
    target = os.environ['GITHUB_SHA']
    registry = json.loads((ROOT / 'registry.json').read_text(encoding='utf-8'))
    for item in registry['packages']:
        publish(item, target)


if __name__ == '__main__':
    main()
