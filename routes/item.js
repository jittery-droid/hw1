const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const item = Item.findById(id);
    res.status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const item = Item.findByIdAndDelete(id);
    res.status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
