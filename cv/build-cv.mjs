// Génère les PDF des CV à partir des pages HTML de ce dossier.
// Usage : node cv/build-cv.mjs   (depuis la racine du portfolio)
// Nécessite playwright-core (npx -y playwright-core ne suffit pas : `npm i -D playwright-core`)
// et un Chrome installé ; à défaut : ouvrir cv-fr.html dans Chrome → Imprimer → Enregistrer en PDF
// (format A4, marges : aucune, graphiques d'arrière-plan : activés).
import { chromium } from 'playwright-core';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const out = process.env.CV_OUT ?? join(here, '..', 'public');
const jobs = [
    ['cv-fr.html', 'CV_William_Kim_HACH_Developpeur_Fullstack.pdf'],
    ['cv-en.html', 'CV_William_Kim_HACH_Resume_US.pdf'],
];

const executablePath = process.env.CHROME_PATH
    ?? ['/opt/pw-browsers/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(existsSync);
const browser = await chromium.launch(executablePath ? { executablePath } : { channel: 'chrome' });
const page = await browser.newPage();
for (const [html, pdf] of jobs) {
    await page.goto(pathToFileURL(join(here, html)).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Garde-fou : le contenu ne doit pas dépasser la page A4
    const overflow = await page.evaluate(() => {
        const p = document.querySelector('.page');
        return [...p.querySelectorAll('.main, .side, .footer')].some(el => el.getBoundingClientRect().bottom > p.getBoundingClientRect().bottom - 2);
    });
    if (overflow) console.warn(`⚠ ${html} : le contenu dépasse la page A4`);
    await page.pdf({ path: join(out, pdf), format: 'A4', printBackground: true, preferCSSPageSize: true });
    console.log(`✓ ${pdf}`);
}
await browser.close();
