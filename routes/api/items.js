const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

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
 * Create item
 * @ Public
 * */
router.post('/', auth, (req, res) => {
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

/*
 * @route DELETE api/items/:id
 * DELETE item
 * @ Public
 * */
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item.remove().then(() => res.status(200).json({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
