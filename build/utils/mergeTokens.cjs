// Minimal deterministic merge respecting last-in-wins
const fs = require('fs');
const path = require('path');
const glob = require('glob');

function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    const sv = source[key];
    const tv = target[key];
    if (sv && typeof sv === 'object' && !Array.isArray(sv)) {
      target[key] = deepMerge(tv && typeof tv === 'object' ? tv : {}, sv);
    } else {
      target[key] = sv; // last-in-wins
    }
  }
  return target;
}

function loadAndMerge(patterns) {
  const files = patterns.flatMap(p => glob.sync(path.join(process.cwd(), p)));
  const merged = {};
  for (const file of files) {
    const json = JSON.parse(fs.readFileSync(file, 'utf8'));
    deepMerge(merged, json);
  }
  return { merged, files };
}

module.exports = { deepMerge, loadAndMerge };
