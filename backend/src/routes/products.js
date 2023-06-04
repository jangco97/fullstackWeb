const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');
const Comment = require('../models/Comment');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single('file');

router.post('/', auth, async (req, res, next) => {
  try {
    const product = new Product(req.body);
    product.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.post('/image', auth, async (req, res, next) => {
  upload(req, res, err => {
    if (err) {
      return req.statusCode(500).send(err);
    }
    return res.json({ fileName: res.req.file.filename });
  });
});

router.get('/:id', async (req, res, next) => {
  const type = req.query.type;
  let productIds = req.params.id;

  if (type === 'array') {
    let ids = productIds.split(',');
    productIds = ids.map(item => {
      return item;
    });
  }

  try {
    const product = await Product.find({ _id: { $in: productIds } }).populate('writer');

    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
});
router.patch('/:id', auth, async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updatedFields = req.body;

    const product = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const productId = req.params.id;

    // 1. 상품과 관련된 모든 댓글을 찾습니다.
    const comments = await Comment.find({ productId });
    console.log(comments, '삭제완료');
    // 2. 찾은 댓글들을 삭제합니다.
    await Comment.deleteMany({ productId });

    // 3. 상품을 삭제합니다.
    const product = await Product.findByIdAndRemove(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product and related comments deleted successfully' });
  } catch (error) {
    next(error);
  }
});
router.get('/', async (req, res, next) => {
  const order = req.query.order ? req.query.order : 'desc';
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 0;
  const term = req.query.searchTerm;
  let findArgs = {};
  for (let key in req.query.filters) {
    if (req.query.filters[key].length > 0) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.query.filters[key][0],
          $lte: req.query.filters[key][1],
        };
      } else {
        findArgs[key] = req.query.filters[key];
      }
    }
  }
  if (term) {
    findArgs['$text'] = { $search: term };
  }
  try {
    const products = await Product.find(findArgs)
      .populate('writer')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    const productsTotal = await Product.countDocuments(findArgs);
    const hasMore = skip + limit < productsTotal ? true : false;

    return res.status(200).json({
      products,
      hasMore,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
//Product document의 (총개수)와 (그동안 가져온 개수+다음 가져올 개수)를 비교하여 개수가 적으면 true를 리턴, 많으면 false를 리턴한다.
