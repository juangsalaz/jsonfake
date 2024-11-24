import express from 'express';
import fs from 'fs';
import path from 'path';
import clone from 'clone';
import { fileURLToPath } from 'url';
import http from 'http';

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../db.json');
const publicPath = path.join(__dirname, '../public');

let rawdata = fs.readFileSync(dbPath);
let data = JSON.parse(rawdata);

app.use(express.static(publicPath));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/data/users', (req, res) => {
  const clonedUsers = clone(data.users);
  res.json(clonedUsers)
});

app.get('/data/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = data.users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

app.get('/data/categories', (req, res) => {
  const clonedCategories = clone(data.categories);
  res.json(clonedCategories)
});

app.get('/data/categories/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = data.categories.find(category => category.id === categoryId);

  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  res.json(category);
});

app.get('/data/products', (req, res) => {
  const clonedProducts = clone(data.products);
  res.json(clonedProducts)
});

app.get('/data/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = data.products.find(product => product.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

app.get('/data/transactions', (req, res) => {
  const clonedTransactions = clone(data.transactions);
  res.json(clonedTransactions)
});

app.get('/data/transactions/:id', (req, res) => {
  const transactionsId = req.params.id;
  const transaction = data.transactions.find(transaction => transaction.id === transactionsId);

  if (!transaction) {
    return res.status(404).json({ message: 'Transaction not found' });
  }

  res.json(transaction);
});

app.get('/data/products/category/:category', (req, res) => {
  const category = req.params.category;

  const filteredProducts = data.products.filter(
    (product) => product.category.slug === category
  );

  if (filteredProducts.length > 0) {
    res.json(filteredProducts);
  } else {
    res.status(404).json({ message: "No products found for this category." });
  }

});

app.get('/data/transactions/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const filteredTransactions = data.transactions.filter(
    (transaction) => transaction.user_id === userId
  );

  if (filteredTransactions.length > 0) {
    res.json(filteredTransactions);
  } else {
    res.status(404).json({ message: "No transactions found for this user." });
  }

});

app.get('/data/transactions/product/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  const filteredTransactions = data.transactions.filter(
    (transaction) => transaction.products.some(
      (product) => product.product_id === productId
    )
  );

  if (filteredTransactions.length > 0) {
    res.json(filteredTransactions);
  } else {
    res.status(404).json({ message: "No transactions found for this product." });
  }

});

//create new user
app.post('/data/users', (req, res) => {
  const {name, username, email, address, phone } = req.body;

  if (!name || !username || !email || !address || !phone) {
    return res.status(400).json({ message: "All user fields are required." });
  }

  const id = 123;
  const newUser = {id, name, username, email, address, phone };

  res.status(201).json({
    message: "User created successfully.",
    user: newUser
  });
});

//update user
app.patch('/data/users/:id', (req, res) => {

  const userId = parseInt(req.params.id, 10);
  const user = data.users.find(user => user.id === userId);

  const userClone = clone(user);

  if (!userClone) {
    return res.status(404).json({ message: 'User not found' });
  }

  const {name, username, email, address, phone } = req.body;

  if (name) {
    userClone.name = name;
  }

  if (username) {
    userClone.username = username;
  }

  if (email) {
    userClone.email = email;
  }

  if (address) {
    userClone.address = address;
  }

  if (phone) {
    userClone.phone = phone;
  }

  res.status(201).json({
    message: "User updated successfully.",
    user: userClone
  });
});

//delete user
app.delete('/data/users/:id', (req, res) => {

  const userId = parseInt(req.params.id, 10);
  const user = data.users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(201).json({
    message: "User deleted successfully."
  });
});

//create new category
app.post('/data/categories', (req, res) => {
  const {name, slug, description } = req.body;

  if (!name || !slug || !description) {
    return res.status(400).json({ message: "All category fields are required." });
  }

  const id = 123;
  const newCategory = {id, name, slug, description };

  res.status(201).json({
    message: "category created successfully.",
    category: newCategory
  });
});

//update category
app.patch('/data/categories/:id', (req, res) => {

  const categoryId = parseInt(req.params.id);
  const category = data.categories.find(category => category.id === categoryId);

  const categoryClone = clone(category);

  if (!categoryClone) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const {name, slug, description } = req.body;

  if (name) {
    categoryClone.name = name;
  }

  if (slug) {
    categoryClone.slug = slug;
  }

  if (description) {
    categoryClone.description = description;
  }

  res.status(201).json({
    message: "Category updated successfully.",
    category: categoryClone
  });
});

//delete category
app.delete('/data/categories/:id', (req, res) => {

  const categoryId = parseInt(req.params.id);
  const category = data.categories.find(category => category.id === categoryId);

  if (!category) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(201).json({
    message: "Category deleted successfully."
  });
});

//create new product
app.post('/data/products', (req, res) => {
  const {name, slug, description, short_description, images, thumbnail, price, discount_price, currency, stock_quantity, availability, category, brand, attributes} = req.body;

  if (!name || !slug || !description || !short_description || !images || !thumbnail || !price || !discount_price || !currency || !stock_quantity || !availability || !category || !brand || !attributes) {
    return res.status(400).json({ message: "All product fields are required." });
  }

  const id = 123;
  const newProduct = {id, name, slug, description, short_description, images, thumbnail, price, discount_price, currency, stock_quantity, availability, category, brand, attributes};

  res.status(201).json({
    message: "product created successfully.",
    product: newProduct
  });
});

//update product
app.patch('/data/products/:id', (req, res) => {

  const productId = parseInt(req.params.id);
  const product = data.products.find(product => product.id === productId);

  const productClone = clone(product);

  if (!productClone) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const {name, slug, description, short_description, images, thumbnail, price, discount_price, currency, stock_quantity, availability, category, brand, attributes} = req.body;

  if (name) {
    productClone.name = name;
  }

  if (slug) {
    productClone.slug = slug;
  }

  if (description) {
    productClone.description = description;
  }

  if (short_description) {
    productClone.short_description = short_description;
  }

  if (images) {
    productClone.images = images;
  }

  if (thumbnail) {
    productClone.thumbnail = thumbnail;
  }

  if (price) {
    productClone.price = price;
  }

  if (discount_price) {
    productClone.discount_price = discount_price;
  }

  if (currency) {
    productClone.currency = currency;
  }

  if (stock_quantity) {
    productClone.stock_quantity = stock_quantity;
  }

  if (availability) {
    productClone.availability = availability;
  }

  if (category) {
    productClone.category = category;
  }

  if (brand) {
    productClone.brand = brand;
  }

  if (attributes) {
    productClone.attributes = attributes;
  }

  res.status(201).json({
    message: "Product updated successfully.",
    product: productClone
  });
});

//delete product
app.delete('/data/products/:id', (req, res) => {

  const productId = parseInt(req.params.id);
  const product = data.products.find(product => product.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(201).json({
    message: "Product deleted successfully."
  });
});

//create new transaction
app.post('/data/transactions', (req, res) => {
  const {user_id, user_name, email, products, total_amount, transaction_date, status} = req.body;

  if (!user_id || !user_name || !email || !products || !total_amount || !transaction_date || !status) {
    return res.status(400).json({ message: "All transaction fields are required." });
  }

  const id = 123;
  const newTransaction = {id, user_id, user_name, email, products, total_amount, transaction_date, status};

  res.status(201).json({
    message: "transaction created successfully.",
    product: newTransaction
  });
});

const server = http.createServer(app);

export default server;
