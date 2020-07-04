const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.post('/:id', async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    let item = new Item({
      id: req.params.id,
      name,
      price,
      quantity,
    });
    item.save();
    res.status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
