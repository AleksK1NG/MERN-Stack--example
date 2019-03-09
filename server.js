const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Item = require('./models/Item');

const app = express();

/*
 * BodyParser middleware
 * */
app.use(bodyParser.json());

/*
 * DB Mlab config
 * */
const db = require('./config/keys').mongoURI;

/*
 * Connect to MongoDB
 * */
mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error(err);
  });

/*
 *   Run server
 * */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
