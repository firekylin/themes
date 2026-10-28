import importlib.util
import json
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location('builder', ROOT / 'scripts' / 'build-registry.py')
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


class SynchronizeTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / 'packages').mkdir()
        (self.root / '.github').mkdir()
        (self.root / '.github/theme-state.json').write_text('{}\n')
        (self.root / 'registry.json').write_text('{"schemaVersion":1,"packages":[]}\n')
        self.calls = []
        self.make_theme('one', '1.0.0')
        self.make_theme('two', '1.0.0')

    def make_theme(self, name, version):
        directory = self.root / 'packages' / name
        directory.mkdir(exist_ok=True)
        (directory / 'package.json').write_text(json.dumps({'name': name, 'version': version}))
        (directory / 'index.eta').write_text(f'{name} {version}')

    def publish(self, item, target, root):
        self.assertTrue((root / 'dist' / f"{item['id']}-{item['version']}.zip").exists())
        self.calls.append((item['id'], item['version'], target))

    def test_publishes_only_changed_themes_and_updates_all_entries(self):
        builder.synchronize(self.root, 'commit-one', self.publish)
        self.assertEqual([entry[0] for entry in self.calls], ['one', 'two'])
        self.calls.clear()
        builder.synchronize(self.root, 'commit-two', self.publish)
        self.assertEqual(self.calls, [])
        self.make_theme('one', '2.0.0')
        builder.synchronize(self.root, 'commit-three', self.publish)
        self.assertEqual(self.calls, [('one', '2.0.0', 'commit-three')])
        registry = json.loads((self.root / 'registry.json').read_text())
        self.assertEqual([(item['id'], item['version']) for item in registry['packages']],
                         [('one', '2.0.0'), ('two', '1.0.0')])

    def test_failure_does_not_write_registry_or_publication_state(self):
        builder.synchronize(self.root, 'commit-one', self.publish)
        registry = (self.root / 'registry.json').read_bytes()
        state = (self.root / '.github/theme-state.json').read_bytes()
        self.make_theme('one', '2.0.0')
        def fail(*args):
            raise ValueError('release failed')
        with self.assertRaisesRegex(ValueError, 'release failed'):
            builder.synchronize(self.root, 'commit-two', fail)
        self.assertEqual((self.root / 'registry.json').read_bytes(), registry)
        self.assertEqual((self.root / '.github/theme-state.json').read_bytes(), state)

    def test_removed_theme_is_removed_from_registry_without_build(self):
        import shutil
        builder.synchronize(self.root, 'commit-one', self.publish)
        self.calls.clear()
        shutil.rmtree(self.root / 'packages/two')
        builder.synchronize(self.root, 'commit-two', self.publish)
        self.assertEqual(self.calls, [])
        self.assertEqual([item['id'] for item in json.loads((self.root / 'registry.json').read_text())['packages']], ['one'])


if __name__ == '__main__':
    unittest.main()
