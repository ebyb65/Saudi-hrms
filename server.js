const express = require('express');
const app = express();
app.use(express.json());

// 1. സൗദി തൊഴിൽ നിയമപ്രകാരമുള്ള End of Service Benefits (ESB)
app.post('/api/calculate-esb', (req, res) => {
  const { basicSalary, totalYears, isResignation } = req.body;
  let esb = 0;

  // ആദ്യത്തെ 5 വർഷം: ഓരോ വർഷത്തിനും 0.5 മാസ ശമ്പളം
  // 5 വർഷത്തിന് ശേഷം: ഓരോ വർഷത്തിനും 1 മാസ ശമ്പളം
  if (totalYears <= 5) {
    esb = (basicSalary / 2) * totalYears;
  } else {
    esb = (basicSalary / 2) * 5 + basicSalary * (totalYears - 5);
  }

  // രാജി വെക്കുകയാണെങ്കിൽ (Resignation Rules)
  if (isResignation) {
    if (totalYears < 2) esb = 0;
    else if (totalYears >= 2 && totalYears < 5) esb = esb / 3;
    else if (totalYears >= 5 && totalYears < 10) esb = (esb * 2) / 3;
  }

  res.json({
    status: 'success',
    totalGratuitySAR: esb.toFixed(2),
    currency: 'SAR'
  });
});

// 2. ഇഖാമ & ഡോക്യുമെന്റ് എക്സ്പയറി അലേർട്ട് ചെക്ക്
app.get('/api/check-expiry', (req, res) => {
  res.json({
    notifications: [
      { employee: "Ahmed Ali", doc: "Iqama", daysRemaining: 25, alert: "URGENT" }
    ]
  });
});

app.listen(3000, () => console.log('Saudi HRMS Server running on port 3000'));
