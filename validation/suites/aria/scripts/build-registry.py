#!/usr/bin/env python3
"""Build changed themes, publish their releases, then update the registry."""
import base64
import hashlib
import importlib.util
import json
import re
import zipfile
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://raw.githubusercontent.com/firekylin/themes/main'
STATE = '.github/theme-state.json'


def theme_files(directory):
    files = []
    for source in sorted(directory.rglob('*')):
        if source.is_symlink():
            raise ValueError(f'Symbolic links are not supported: {source}')
        relative = source.relative_to(directory)
        if not source.is_file() or source.name in {'.gitkeep', '.DS_Store'} or 'node_modules' in relative.parts:
            continue
        files.append((relative.as_posix(), source))
    return files


def source_hash(files):
    digest = hashlib.sha256()
    for relative, source in files:
        name = relative.encode('utf-8')
        data = source.read_bytes()
        digest.update(len(name).to_bytes(8, 'big'))
        digest.update(name)
        digest.update(len(data).to_bytes(8, 'big'))
        digest.update(data)
    return digest.hexdigest()


def build_theme(directory, root, files):
    manifest = json.loads((directory / 'package.json').read_text(encoding='utf-8'))
    metadata = manifest.get('firekylin', {})
    theme_id = metadata.get('id') or manifest.get('id') or manifest['name']
    version = manifest['version']
    if not re.fullmatch(r'[a-zA-Z0-9][a-zA-Z0-9._-]*', theme_id):
        raise ValueError(f'Invalid theme ID: {theme_id}')
    if not re.fullmatch(r'\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?', version):
        raise ValueError(f'Invalid theme version: {version}')
    archive = root / 'dist' / f'{theme_id}-{version}.zip'
    archive.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_STORED) as output:
        for relative, source in files:
            info = zipfile.ZipInfo(relative, (1980, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_STORED
            info.external_attr = 0o100644 << 16
            output.writestr(info, source.read_bytes())
    digest = base64.b64encode(hashlib.sha512(archive.read_bytes()).digest()).decode('ascii')
    item = {
        'type': 'theme', 'name': manifest['name'], 'id': theme_id, 'version': version,
        'title': manifest.get('title', 'Firekylin' if theme_id == 'firekylin' else theme_id),
        'description': manifest.get('description', 'Firekylin 默认主题' if theme_id == 'firekylin' else ''),
        'download': f'https://github.com/firekylin/themes/releases/download/'
                    f'{quote(theme_id + "-v" + version, safe="")}/{quote(archive.name, safe="")}',
        'integrity': f'sha512-{digest}',
    }
    if (directory / 'screenshot.png').is_file():
        item['screenshot'] = f'{BASE}/packages/{directory.name}/screenshot.png'
    if metadata.get('engine'):
        item['firekylin'] = {'engine': metadata['engine']}
    if manifest.get('engines'):
        item['engines'] = manifest['engines']
    return item


def synchronize(root, target, publish):
    registry = json.loads((root / 'registry.json').read_text(encoding='utf-8'))
    state_path = root / STATE
    state = json.loads(state_path.read_text(encoding='utf-8'))
    existing = {item['id']: item for item in registry['packages']}
    if len(existing) != len(registry['packages']):
        raise ValueError('Duplicate theme ID in registry')
    next_state = {}
    items = []
    for directory in sorted((root / 'packages').iterdir()):
        if not directory.is_dir():
            continue
        files = theme_files(directory)
        fingerprint = source_hash(files)
        previous = state.get(directory.name, {})
        if previous.get('hash') == fingerprint and previous.get('id') in existing:
            item = existing[previous['id']]
        else:
            item = build_theme(directory, root, files)
            publish(item, target, root)
        if any(other['id'] == item['id'] for other in items):
            raise ValueError(f"Duplicate theme ID: {item['id']}")
        items.append(item)
        next_state[directory.name] = {'id': item['id'], 'hash': fingerprint}
    (root / 'registry.json').write_text(json.dumps({'schemaVersion': 1, 'packages': items},
                                                  ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    state_path.write_text(json.dumps(next_state, sort_keys=True, indent=2) + '\n', encoding='utf-8')


def main():
    import os
    spec = importlib.util.spec_from_file_location('publisher', ROOT / 'scripts' / 'publish-releases.py')
    publisher = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(publisher)
    synchronize(ROOT, os.environ['GITHUB_SHA'], publisher.publish)


if __name__ == '__main__':
    main()
