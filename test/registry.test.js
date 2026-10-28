'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
test('registry points to the matching workspace theme and archive integrity', () => {
  const registry = JSON.parse(fs.readFileSync(path.join(root, 'registry.json'), 'utf8'));
  assert.equal(registry.schemaVersion, 1);
  const themes = fs.readdirSync(path.join(root, 'packages'), {withFileTypes: true})
    .filter(entry => entry.isDirectory());
  assert.equal(registry.packages.length, themes.length);
  for (const directory of themes) {
    const theme = path.join(root, 'packages', directory.name);
    const manifest = JSON.parse(fs.readFileSync(path.join(theme, 'package.json'), 'utf8'));
    const id = manifest.firekylin?.id || manifest.id || manifest.name;
    const matches = registry.packages.filter(entry => entry.id === id);
    assert.equal(matches.length, 1);
    const item = matches[0];
    assert.equal(item.type, 'theme');
    assert.equal(item.name, manifest.name);
    assert.equal(item.version, manifest.version);
    const filename = `${id}-${manifest.version}.zip`;
    const tag = encodeURIComponent(`${id}-v${manifest.version}`);
    assert.equal(item.download, `https://github.com/firekylin/themes/releases/download/${tag}/${encodeURIComponent(filename)}`);
    const digest = crypto.createHash('sha512').update(fs.readFileSync(path.join(root, 'dist', filename))).digest('base64');
    assert.equal(item.integrity, `sha512-${digest}`);
    if (fs.existsSync(path.join(theme, 'screenshot.png'))) {
      assert.equal(item.screenshot,
        `https://raw.githubusercontent.com/firekylin/themes/main/packages/${directory.name}/screenshot.png`);
    }
  }
});
