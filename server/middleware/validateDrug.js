module.exports = function validateDrug(req, res, next) {
  const { name, dosage, card, pack, perDay } = req.body;

  // a. Name length > 5
  if (!name || name.length <= 5) {
    return res.status(400).json({ error: 'Name must be longer than 5 characters' });
  }

  // b. Dosage format: XX-morning,XX-afternoon,XX-night
  const dosageRegex = /^\d{2}-morning,\d{2}-afternoon,\d{2}-night$/;
  if (!dosageRegex.test(dosage)) {
    return res.status(400).json({ error: 'Dosage must follow format: XX-morning,XX-afternoon,XX-night (X is digit)' });
  }

  // c. Card > 1000
  if (isNaN(card) || Number(card) <= 1000) {
    return res.status(400).json({ error: 'Card must be greater than 1000' });
  }

  // d. Pack > 0
  if (isNaN(pack) || Number(pack) <= 0) {
    return res.status(400).json({ error: 'Pack must be greater than 0' });
  }

  // e. PerDay > 0 and < 90
  if (isNaN(perDay) || Number(perDay) <= 0 || Number(perDay) >= 90) {
    return res.status(400).json({ error: 'PerDay must be greater than 0 and less than 90' });
  }

  // Nếu hợp lệ thì cho đi tiếp
  next();
};
