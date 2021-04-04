const puppeteer = require('puppeteer');
const fs = require('fs');
let doteenv = require('dotenv').config();

username = process.env.MY_USERNAME;
password = process.env.MY_PASSWORD;

console.log(username, password);

(async () => {
    let = url = 'https://zssebechleby.edupage.org/login/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });


    // Login
    await page.type('#login_Login_1e1', `${username}`);
    await page.type('#login_Login_1e2', `${password}`);

    await Promise.all([
        page.waitForNavigation(), // The promise resolves after navigation has finished
        page.click('.skgdFormSubmit'), // Clicking the link will indirectly cause a navigation
    ]);
    await page.screenshot({ path: 'example.png' });

    let data = await page.evaluate(() => {
        let rozvrh = document.querySelector('ul[class="rozvrh clearfix"]').innerText;

        return (rozvrh);
    });

    fs.writeFile('../client/rozvrh.json', JSON.stringify(data), err => err ? console.log(err) : null);

    await browser.close();
})();