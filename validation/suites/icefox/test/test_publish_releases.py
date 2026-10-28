import base64
import hashlib
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('publisher', ROOT / 'scripts' / 'publish-releases.py')
publisher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)


class PublishTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'dist').mkdir()
        (self.root / 'dist/firekylin-0.1.0.zip').write_bytes(b'archive')
        self.item = {'id': 'firekylin', 'version': '0.1.0', 'title': 'Firekylin',
                     'download': 'https://github.com/firekylin/themes/releases/download/'
                                 'firekylin-v0.1.0/firekylin-0.1.0.zip',
                     'integrity': 'sha512-' + base64.b64encode(hashlib.sha512(b'archive').digest()).decode()}

    def test_creates_missing_release(self):
        calls = []
        def run(args, **kwargs):
            calls.append(args)
            return SimpleNamespace(returncode=1, stdout='')
        publisher.publish(self.item, 'commit-sha', self.root, run)
        self.assertEqual(calls[1][0:3], ['gh', 'release', 'create'])
        self.assertIn('commit-sha', calls[1])

    def test_rejects_invalid_integrity_without_creating_release(self):
        self.item['integrity'] = 'sha512-invalid'
        with self.assertRaisesRegex(ValueError, 'does not match'):
            publisher.publish(self.item, 'commit-sha', self.root, lambda *args, **kwargs: self.fail('unexpected call'))

    def test_existing_matching_release_does_not_create_another_release(self):
        calls = []
        def run(args, **kwargs):
            calls.append(args)
            if args[2] == 'view':
                return SimpleNamespace(returncode=0, stdout=json.dumps({'assets': [{'name': 'firekylin-0.1.0.zip'}]}))
            Path(args[args.index('--dir') + 1], 'firekylin-0.1.0.zip').write_bytes(b'archive')
            return SimpleNamespace(returncode=0, stdout='')
        publisher.publish(self.item, 'commit-sha', self.root, run)
        self.assertEqual([call[2] for call in calls], ['view', 'download'])

    def test_existing_release_must_match_and_is_not_overwritten(self):
        calls = []
        def run(args, **kwargs):
            calls.append(args)
            if args[2] == 'view':
                return SimpleNamespace(returncode=0, stdout=json.dumps({'assets': [{'name': 'firekylin-0.1.0.zip'}]}))
            Path(args[args.index('--dir') + 1], 'firekylin-0.1.0.zip').write_bytes(b'old archive')
            return SimpleNamespace(returncode=0, stdout='')
        with self.assertRaisesRegex(ValueError, 'increment the theme version'):
            publisher.publish(self.item, 'commit-sha', self.root, run)
        self.assertEqual([call[2] for call in calls], ['view', 'download'])


if __name__ == '__main__':
    unittest.main()
