'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..', 'package');

test('workspace themes have unique names, versions and entry templates', () => {
  const directories = fs.readdirSync(root, {withFileTypes: true}).filter(entry => entry.isDirectory());
  assert.ok(directories.length > 0);
  const names = new Set();
  for (const directory of directories) {
    const theme = path.join(root, directory.name);
    const manifest = JSON.parse(fs.readFileSync(path.join(theme, 'package.json'), 'utf8'));
    const id = manifest.firekylin?.id || manifest.id || manifest.name;
    assert.match(id, /^[a-z0-9][a-z0-9._-]*$/i);
    assert.match(manifest.version, /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/);
    assert.ok(!names.has(id), `Duplicate theme ID: ${id}`);
    names.add(id);
    assert.ok(fs.statSync(path.join(theme, 'index.eta')).isFile());
  }
  assert.ok(names.has('firekylin'));
});
