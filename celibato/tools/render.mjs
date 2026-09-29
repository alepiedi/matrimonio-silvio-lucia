// Rigenera locandina.pdf e l'anteprima social (assets/img/og-image.jpg)
// dopo aver modificato assets/js/config.js.
//
//   npm i -D playwright     (una volta sola, se non lo avete)
//   node celibato/tools/render.mjs
//
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const page = pathToFileURL(path.join(dir, 'locandina.html')).href;

const browser = await chromium.launch();
const tab = await browser.newPage();

await tab.goto(page, { waitUntil: 'networkidle' });
await tab.evaluate(() => document.fonts.ready);
await tab.pdf({ path: path.join(dir, 'locandina.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });

await tab.setViewportSize({ width: 1200, height: 630 });
await tab.goto(page + '?og', { waitUntil: 'networkidle' });
await tab.evaluate(() => document.fonts.ready);
await tab.screenshot({ path: path.join(dir, 'assets/img/og-image.jpg'), type: 'jpeg', quality: 86, clip: { x: 0, y: 0, width: 1200, height: 630 } });

await browser.close();
console.log('Creati: locandina.pdf e assets/img/og-image.jpg');
