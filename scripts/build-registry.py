#!/usr/bin/env python3
"""Build deterministic theme archives and the Firekylin marketplace registry."""
import base64
import hashlib
import json
import re
import zipfile
from urllib.parse import quote
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://raw.githubusercontent.com/firekylin/themes/main'


def build():
    packages = []
    for directory in sorted((ROOT / 'packages').iterdir()):
        if not directory.is_dir():
            continue
        manifest = json.loads((directory / 'package.json').read_text(encoding='utf-8'))
        metadata = manifest.get('firekylin', {})
        theme_id = metadata.get('id') or manifest.get('id') or manifest['name']
        version = manifest['version']
        if not re.fullmatch(r'[a-zA-Z0-9][a-zA-Z0-9._-]*', theme_id):
            raise ValueError(f'Invalid theme ID: {theme_id}')
        if not re.fullmatch(r'\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?', version):
            raise ValueError(f'Invalid theme version: {version}')
        archive = ROOT / 'dist' / f'{theme_id}-{version}.zip'
        archive.parent.mkdir(exist_ok=True)
        with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_STORED) as output:
            for source in sorted(directory.rglob('*')):
                if source.is_symlink():
                    raise ValueError(f'Symbolic links are not supported: {source}')
                relative = source.relative_to(directory)
                if not source.is_file() or source.name in {'.gitkeep', '.DS_Store'} or 'node_modules' in relative.parts:
                    continue
                info = zipfile.ZipInfo(relative.as_posix(), (1980, 1, 1, 0, 0, 0))
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
        packages.append(item)
    (ROOT / 'registry.json').write_text(json.dumps({'schemaVersion': 1, 'packages': packages},
                                                   ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


if __name__ == '__main__':
    build()
