const fs = require('fs');
const puppeteer = require('puppeteer');

const htmlsDir = 'htmls';
const pdfsDir = 'pdfs';

fs.readdir(htmlsDir, ((err, files) => {
    if (err) {
        return console.error(err);
    }

    files.forEach(async (filename) => {
        const buf = fs.readFileSync(`${htmlsDir}/${filename}`, {encoding: 'utf-8'});
        const html = buf.toString('ascii');

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, {waitUntil: 'networkidle2'});
        await page.pdf({path: `${pdfsDir}/${filename}.pdf`, format: 'A4'});
        await browser.close()
    });
}));