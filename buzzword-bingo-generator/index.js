const puppeteer = require('puppeteer');
const fs = require('fs');

let fill = async function (page, selector, text) {
    let input = await page.$(selector);
    await input.click({clickCount: 3});
    await input.type(text);
    return input;
};

let submit = async function (page) {
    page.$eval('#customcard', form => form.submit());
    await page.waitForNavigation();
};

let saveBingoCards = async function (page, amount) {
    if (!fs.existsSync('output')) {
        fs.mkdirSync('output');
    }

    for (let i = 0; i < amount; i++) {
        await page.pdf({path: 'output/Bingo_' + i + '.pdf', format: 'A4'});
        await page.reload();
    }
};

let setupBingoCard = async function (page) {
    await fill(page, '#title', 'Software testing in CI/CD pipelines');
    await fill(page, '#exclamation', 'Bingo');
    await fill(page, '#terms', fs.readFileSync('buzzword_bingo.txt').toString());
    await submit(page);
    await page.goto(page.url() + '&cardonly=1', {waitUntil: 'networkidle2'});
};

(async () => {
    const browser =  await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://www.bullshitbingo.net/byo/', {waitUntil: 'networkidle2'});

    await setupBingoCard(page);
    await saveBingoCards(page, 100);

    await browser.close();
})();