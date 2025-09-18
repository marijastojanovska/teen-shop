const express = require('express');
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }
  let total = 0;
  for (const it of items) {
    const p = await Product.findById(it.product);
    if (!p) return res.status(400).json({ message: `Invalid product ${it.product}` });
    if (p.countInStock < it.qty) return res.status(400).json({ message: `Not enough stock of ${p.name}` });
    total += p.price * it.qty;
    p.countInStock -= it.qty;
    await p.save();
    it.name = p.name;
    it.image = p.image;
    it.price = p.price;
  }
  const order = await Order.create({ user: req.user._id, items, total, shippingAddress });
  res.status(201).json(order);
}));

router.get('/mine', protect, asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
}));

router.get('/', protect, admin, asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
}));

router.patch('/:id/status', protect, admin, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  const { status } = req.body;
  if (!['pending','paid','shipped','completed','cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  order.status = status;
  await order.save();
  res.json(order);
}));

module.exports = router;
