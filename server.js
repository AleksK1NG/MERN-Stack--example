const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const itemsRoutes = require('./routes/api/items');
const usersRoutes = require('./routes/api/users');

const app = express();

/*
 * BodyParser middleware
 * */
app.use(express.json());

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
const db = config.get('mongoURI');

/*
 * Connect to MongoDB
 * */
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
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
app.use('/api/users', usersRoutes);

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
