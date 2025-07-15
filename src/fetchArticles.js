const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const { parseAgeToDate } = require('./utils');

async function fetchArticles() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let articles = [];
  let url = 'https://news.ycombinator.com/newest';

  while (articles.length < 100) {
    await page.goto(url);
    
    const newArticles = await page.$$eval('.athing', rows =>
      rows.map(row => {
        const title = row.querySelector('.titleline a')?.innerText || 'No title';
        const link = row.querySelector('.titleline a')?.href || '';
        const id = row.getAttribute('id');
        const subtext = row.nextElementSibling;
        const age = subtext?.querySelector('.age')?.innerText || 'Unknown';

        return { id, title, link, age };
      })
    );

    const pageArticles = newArticles.map(article => ({
      ...article,
      timestamp: parseAgeToDate(article.age),
    }));

    articles = [...articles, ...pageArticles];

    // // Next page
    // let next = await page.$eval('a.morelink', el => el.getAttribute('href'));
    // if (!next.startsWith('http')) {
    //   next = `https://news.ycombinator.com/${next}`;
    // }
    // url = next;
    const nextLink = await page.$('a.morelink');

    if (!nextLink) {
    console.log('Reached the last page or failed to find next page link.');
    break;
    }

    let next = await nextLink.getAttribute('href');
    if (!next.startsWith('http')) {
    next = `https://news.ycombinator.com/${next}`;
    }
    url = next;
  }

  await browser.close();
  articles = articles.slice(0, 100);

//   const dataPath = path.join(__dirname, '..', 'data', 'articles.json');
//   fs.mkdirSync(path.dirname(dataPath), { recursive: true });
//   fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2));

  return articles;
}

module.exports = { fetchArticles };
