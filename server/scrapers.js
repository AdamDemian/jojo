const puppeteer = require('puppeteer');

(async () => {
    let = url = 'https://zssebechleby.edupage.org/login/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });


    // Login
    await page.type('#login_Login_1e1', 'AdamDemian');
    await page.type('#login_Login_1e2', '1r68kd33lm');

    await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        page.click('.skgdFormSubmit'), // Clicking the link will indirectly cause a navigation
    ]);

    let data = await page.evaluate(() => {
        let rozvrh = document.querySelector('ul[class="rozvrh clearfix"]').innerText;

        return {
            rozvrh,
        }
    });

    console.log(data);

    debugger;

    await browser.close();
})();