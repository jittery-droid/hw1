const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.listen(PORT);

global.items = [
  { id: '1', name: 'Pencil', price: '$1.00', quantity: 20 },
  { id: '2', name: 'Pen', price: '$2.00', quantity: 20 },
  { id: '3', name: 'Eraser', price: '$0.50', quantity: 50 },
  { id: '4', name: 'Stapler', price: '$5.00', quantity: 10 },
];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/items', (req, res) => {
  res.status(200).json({ items: items });
});

app.get('/item/:id', (req, res) => {
  let item = items.filter((x) => x.id === req.params.id);
  res.status(200).json({ item: item });
});

app.delete('/item/:id', (req, res) => {
  let items = global.items.filter((x) => x.id !== req.params.id);
  global.items = items;
  res.status(200).json({ items: items });
});

app.post('/new-item/:id', (req, res) => {
  items.push({
    id: req.params.id,
    name: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
  });
  res.status(200).json({ items: items });
});

app.post('/update-item/:id', (req, res) => {
  let items = global.items.filter((x) => x.id !== req.params.id);
  items.push({
    id: req.params.id,
    name: req.body.item.name,
    quantity: req.body.item.quantity,
    price: req.body.item.price,
  });
  global.items = items;
  res.status(200).json({ items: items });
});
