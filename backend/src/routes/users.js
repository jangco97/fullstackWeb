const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
router.post('/register', async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error); //에러처리기로 전달
  }
});
router.get('/auth', auth, async (req, res, next) => {
  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});
router.post('/login', async (req, res, next) => {
  try {
    //존재하는 유저인지 체크
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('인증실패 이메일을 찾을 수 없습니다.');
    }

    //비밀번호가 올바른지 체크
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send('비밀번호가 잘못되었습니다.');
    }

    //토큰 생성
    const payload = {
      userId: user._id.toHexString(),
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ user, accessToken }); //유저정보와 accessToken 클라에게 보내기
  } catch (error) {
    next(error); //에러처리기로 전달
  }
});
router.post('/logout', auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error); //에러처리기로 전달
  }
});
module.exports = router;
