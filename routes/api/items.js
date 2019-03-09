const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

/*
 * @route GET api/items
 * Get all items
 * @ Public
 * */
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

/*
 * @route POST api/items
 * Create post
 * @ Public
 * */
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
