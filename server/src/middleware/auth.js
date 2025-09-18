const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function protect(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

function admin(req, res, next) {
  if (req.user && req.user.isAdmin) return next();
  res.status(403).json({ message: 'Admin only' });
}

module.exports = { protect, admin };
