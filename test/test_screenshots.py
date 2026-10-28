"""Validate actual preview files and the registry/ZIP contract without publishing."""
import hashlib
import importlib.util
import struct
import tempfile
import unittest
import zipfile
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('preview_builder', ROOT / 'scripts/build-registry.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


def png_size(data):
    assert data[:8] == b'\x89PNG\r\n\x1a\n', 'Not a PNG'
    offset, pixels, size, ended = 8, bytearray(), None, False
    while offset < len(data):
        length = struct.unpack('>I', data[offset:offset + 4])[0]
        kind = data[offset + 4:offset + 8]
        payload = data[offset + 8:offset + 8 + length]
        crc = struct.unpack('>I', data[offset + 8 + length:offset + 12 + length])[0]
        assert zlib.crc32(kind + payload) & 0xffffffff == crc, 'Invalid PNG checksum'
        if kind == b'IHDR':
            size = struct.unpack('>II', payload[:8])
        if kind == b'IDAT':
            pixels.extend(payload)
        offset += 12 + length
        if kind == b'IEND':
            ended = True
            break
    assert ended and offset == len(data), 'Truncated PNG or trailing data'
    assert zlib.decompress(pixels), 'Empty pixel data'
    return size


class ThemePreviewsTest(unittest.TestCase):
    def test_all_theme_previews_are_valid_distinct_pngs_and_packaged(self):
        themes = sorted(p for p in (ROOT / 'packages').iterdir() if (p / 'package.json').is_file())
        hashes = {}
        with tempfile.TemporaryDirectory() as temp:
            for theme in themes:
                with self.subTest(theme=theme.name):
                    image = (theme / 'screenshot.png').read_bytes()
                    width, height = png_size(image)
                    self.assertGreaterEqual(width, 640)
                    self.assertGreaterEqual(height, 400)
                    digest = hashlib.sha256(image).hexdigest()
                    self.assertNotIn(digest, hashes, f'Duplicate of {hashes.get(digest)}')
                    hashes[digest] = theme.name
                    item = builder.build_theme(theme, Path(temp), builder.theme_files(theme))
                    self.assertEqual(item['screenshot'], f'https://raw.githubusercontent.com/firekylin/themes/main/packages/{theme.name}/screenshot.png')
                    archive = Path(temp) / 'dist' / f"{item['id']}-{item['version']}.zip"
                    with zipfile.ZipFile(archive) as package:
                        self.assertEqual(package.read('screenshot.png'), image)
