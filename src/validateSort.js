function validateSorting(articles) {
    for (let i = 1; i < articles.length; i++) {
      const prev = articles[i - 1].timestamp;
      const current = articles[i].timestamp;
  
      if (current.getTime() > prev.getTime()) {
        console.log(`❌ Article at index ${i} is newer than previous`);
        console.log(`→ ${articles[i - 1].title} @ ${articles[i - 1].timestamp}`);
        console.log(`→ ${articles[i].title} @ ${articles[i].timestamp}`);
        return false;
      }
    }
    return true;
  }
  module.exports = { validateSorting };

  