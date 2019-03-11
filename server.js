const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const itemsRoutes = require('./routes/api/items');

const app = express();

/*
 * BodyParser middleware
 * */
app.use(bodyParser.json());

/*
 * CORS Setup middleware
 * */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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
 * Serve static assets if in production
 * */
if (process.env.NODE_ENV === 'production') {
  //Se static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

/*
 *   Run server
 * */
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
