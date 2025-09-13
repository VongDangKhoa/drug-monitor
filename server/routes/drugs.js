const express = require('express');
const router = express.Router();
const Drug = require('../model/model'); // model thuốc

// Hiển thị form edit
router.get('/:id/edit', async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id);
    if (!drug) return res.status(404).send('Drug not found');
    // TODO: render form edit đúng với view gốc
    res.render('pages/drugs/edit', { drug });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Show chi tiết thuốc
router.get('/:id', async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id);
    if (!drug) return res.status(404).send('Drug not found');
    // TODO: render chi tiết thuốc đúng với view gốc
    res.render('pages/drugs/show', { drug });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
