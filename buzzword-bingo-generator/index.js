const puppeteer = require('puppeteer');
const fs = require('fs');


(async () => {
    const browser =  await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto('https://www.bullshitbingo.net/byo/', {waitUntil: 'networkidle2'});

    let input = await page.$("#title");
    await input.click({ clickCount: 3 });
    await input.type('Software testing in CI/CD pipelines');

    input = await page.$('#exclamation');
    await input.click({ clickCount: 3 });
    await input.type('Bingo');

    input = await page.$('#terms');
    await input.click({ clickCount: 3 });
    await input.type(fs.readFileSync('buzzword_bingo.txt').toString());
    page.$eval('#customcard', form => form.submit());
    await page.waitForNavigation();

    await page.goto(page.url() + '&cardonly=1', {waitUntil: 'networkidle2'});

    if (!fs.existsSync('output')){
        fs.mkdirSync('output');
    }

    for(let i = 0; i < 100; i++){
        await page.pdf({path: 'output/Bingo_' + i + '.pdf', format: 'A4'});
        await page.reload();
    }

    await browser.close();
})();