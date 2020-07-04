const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.put('/:id', async (req, res) => {
  const { name, price, quantity } = req.body.item;
  const newItem = {
    id: req.params.id,
    name,
    price,
    quantity,
  };
  try {
    let item = await Item.findOne({ id: req.params.id });
    console.log(item);
    await Item.findByIdAndUpdate(
      item._id,
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
