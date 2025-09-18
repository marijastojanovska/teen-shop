const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const products = require('./products.json');
const Post = require('../models/Post');

dotenv.config();

async function run() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI missing');
    await mongoose.connect(uri);
    console.log('Connected');
    await Product.deleteMany({});
    await User.deleteMany({});

    await Product.insertMany(products);
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@shop.test',
      password: 'Admin123!',
      isAdmin: true,
    });

    // Add demo posts
const Post = require('../models/Post');
await Post.deleteMany({});
await Post.create([
  {
    title: 'Добредојдовте во Tee Shop PRO',
    slug: 'dobredojdovte-vo-tee-shop-pro',
    excerpt: 'Нова колекција маици, патики и шорцеви.',
    body: 'Нашата нова колекција е тука! Проверете ги најновите производи и попусти.',
    image: 'https://source.unsplash.com/seed/news-1/1200x600/?fashion,clothes',
    tags: ['новости', 'колекција']
  },
  {
    title: 'Попуст викенд: -20% на селектирани производи',
    slug: 'popust-vikend-20-procenti',
    excerpt: 'Само овој викенд – искористете одлични попусти.',
    body: 'Од петок до недела имаме специјални попусти на маици, патики и шорцеви.',
    image: 'https://source.unsplash.com/seed/news-2/1200x600/?sale,fashion',
    tags: ['попуст', 'акција']
  }
]);

    console.log('Seeded products and admin user:');
    console.log({ adminEmail: admin.email, adminPassword: 'Admin123!' });
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
