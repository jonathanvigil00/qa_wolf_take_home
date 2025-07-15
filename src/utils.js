const parseAgeToDate = (ageStr) => {
    const now = new Date();
  
    if (!ageStr || ageStr === 'Unknown') return now;
  
    const [amount, unitRaw] = ageStr.split(' ');
    const unit = unitRaw.replace(/s$/, '');
    const value = parseInt(amount, 10);
  
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
        return now;
    }
  
    // Round to nearest minute
    date.setSeconds(0, 0);
  
    return date;
  };
  module.exports = { parseAgeToDate };
