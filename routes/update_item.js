const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.put('/:id', async (req, res) => {
  const { name, price, quantity } = req.body.item;
  const newItem = {
    name,
    price,
    quantity,
  };
  try {
    let item = await Item.findById(req.params.id);
    item = await Item.findByIdAndUpdate(
      req.params.id,
      {
        $set: newItem,
      },
      { new: true }
    );
    res.status(200);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
