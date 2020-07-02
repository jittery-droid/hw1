const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const PORT = 3000;

connectDB();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use('/items', require('./routes/items'));
app.use('/item', require('./routes/item'));
app.use('/new-item', require('./routes/new_item'));
app.use('/update-item', require('./routes/update_item'));

app.listen(PORT);
