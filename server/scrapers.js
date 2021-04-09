const puppeteer = require('puppeteer');
const fs = require('fs');
const doteenv = require('dotenv').config();

username = process.env.MY_USERNAME;
password = process.env.MY_PASSWORD;


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

    let calendar = await page.evaluate(() => {
        function days() {
            const day1 = document.getElementsByClassName('date').item(0).innerText;
            const day2 = document.getElementsByClassName('date').item(1).innerText;
            const day3 = document.getElementsByClassName('date').item(2).innerText;
            const day4 = document.getElementsByClassName('date').item(3).innerText;
            const day5 = document.getElementsByClassName('date').item(4).innerText;
            const day6 = document.getElementsByClassName('date').item(5).innerText;
            const day7 = document.getElementsByClassName('date').item(6).innerText;
        }

        return days(day1);
    });

    console.log(calendar);

    // fs.writeFile('../views/datarozvrh.json', JSON.stringify(data), err => err ? console.log(err) : null);

    await browser.close();
})();