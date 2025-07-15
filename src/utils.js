const parseAgeToDate = (ageStr) => {
    const now = new Date();
  
    if (!ageStr || ageStr === 'Unknown') return now;
  
    const [amount, unitRaw] = ageStr.split(' ');
    const unit = unitRaw.replace(/s$/, ''); // normalize plural to singular
    const value = parseInt(amount);
  
    const date = new Date(now);
  
    switch (unit) {
      case 'minute':
        date.setMinutes(now.getMinutes() - value);
        break;
      case 'hour':
        date.setHours(now.getHours() - value);
        break;
      case 'day':
        date.setDate(now.getDate() - value);
        break;
      default:
        return now; // fallback
    }
  
    return date;
  };

  module.exports = { parseAgeToDate };
