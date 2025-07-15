// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
// const { chromium } = require("playwright");

// async function sortHackerNewsArticles() {
//   // launch browser
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   // go to Hacker News
//   await page.goto("https://news.ycombinator.com/newest");
// }

// (async () => {
//   await sortHackerNewsArticles();
// })();
//##
const { fetchArticles } = require('./src/fetchArticles');
const { validateSorting } = require('./src/validateSort');

(async () => {
  try {
    const articles = await fetchArticles();
    const isSorted = validateSorting(articles);
    if (!isSorted) {
      console.error("Articles are not sorted from newest to oldest.");
      process.exit(1);
    }
    console.log("All 100 articles are sorted from newest to oldest.");
  } catch (err) {
    console.error("Error during validation:", err);
    process.exit(1);
  }
})();

