const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Comment = require('../models/Comment');

router.get('/:id', async (req, res, next) => {
  let productId = req.params.id;
  try {
    const comment = await Comment.find({ productId: productId }).populate('writer');
    return res.status(200).send(comment);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const comment = new Comment(req.body);
    comment.save();
    return res.sendStatus(201).send(comment);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  let commentId = req.params.id;
  try {
    const comment = await Comment.updateOne({ _id: commentId }, { $set: req.body });
    return res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  let commentId = req.params.id;
  try {
    const comment = await Comment.deleteOne({ _id: commentId });
    return res.status(201).send(comment);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
