function validateSorting(articles) {
    count = 1
    for (let i = 1; i < articles.length; i++) {
        count = count + 1
        const prev = new Date(articles[i - 1].timestamp);
        const current = new Date(articles[i].timestamp);
  
      if (current.getTime() > prev.getTime()) {
        console.log(prev.getTime(), current.getTime());

        console.log(`Article at index ${i} is newer than previous`);
        console.log(`→ ${articles[i - 1].title} @ ${articles[i - 1].timestamp}`);
        console.log(`→ ${articles[i].title} @ ${articles[i].timestamp}`);
        return false;
      }
    }
    console.log("count: ", count);
    return true;
  }
  module.exports = { validateSorting };

  