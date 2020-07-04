const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.get('/', async (req, res) => {
  try {
    const items = Item.find({});
    res.status(200).json({ items: items });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
