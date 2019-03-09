const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const itemsRoutes = require('./routes/api/items');

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
 * Routes
 * */
app.use('/api/items', itemsRoutes);

/*
 *   Run server
 * */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
