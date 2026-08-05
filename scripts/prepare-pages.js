const fs = require('fs');
const path = require('path');

const src = path.resolve('.open-next');
const dst = path.resolve('.open-next/assets');

const items = ['cloudflare', 'middleware', 'server-functions', '.build'];
for (const item of items) {
  const s = path.join(src, item);
  const d = path.join(dst, item);
  if (fs.existsSync(s)) {
    fs.cpSync(s, d, { recursive: true });
    console.log(`✓ Copied ${item}`);
  }
}
fs.copyFileSync(path.join(src, 'worker.js'), path.join(dst, '_worker.js'));
console.log('✓ _worker.js ready');