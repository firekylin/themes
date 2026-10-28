'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('registry contains valid and unique release entries', () => {
  const registry = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'registry.json'), 'utf8'));
  assert.equal(registry.schemaVersion, 1);
  assert.ok(Array.isArray(registry.packages));
  const ids = new Set();
  for (const item of registry.packages) {
    assert.equal(item.type, 'theme');
    assert.match(item.id, /^[a-z0-9][a-z0-9._-]*$/i);
    assert.ok(!ids.has(item.id));
    ids.add(item.id);
    assert.equal(item.download, `https://github.com/firekylin/themes/releases/download/${encodeURIComponent(`${item.id}-v${item.version}`)}/${encodeURIComponent(`${item.id}-${item.version}.zip`)}`);
    assert.match(item.integrity, /^sha512-[A-Za-z0-9+/]{86}==$/);
  }
});
