const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.get('/:id', async (req, res) => {
  try {
    const item = Item.findOne({ id: req.params.id });
    res.status(200).json({ item: item });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const item = Item.findOne({ id: id });
    Item.findByIdAndDelete(item._id);
    res.status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
