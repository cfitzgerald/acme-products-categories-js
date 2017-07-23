const db = require('../db');
const router = require('express').Router();

module.exports = router;

router.get('/:name/products', (req, res, next) => {
  res.render('products', {
    categoryNames: db.getCategoryNames(),
    products: db.getProductsByCategory(req.params.name),
    category: req.params.name
  });
});

router.post('/', (req, res, next) => {
  db.createCategory(req.body);
  res.redirect('/');
});

router.delete('/:name', (req, res, next) => {
  // console.log('req.params.name = ', req.params.name);
  db.deleteCategory(req.params.name);
  res.redirect('/');
});

router.post('/:name/products', (req, res, next) => {
  db.createProduct(req.body, req.params.name);
  res.redirect('/categories/' + req.params.name + '/products'); // can this url be more concise?
});

router.delete('/:name/products/:id', (req, res, next) => {
  // console.log('req.params.name = ', req.params.name);
  // console.log('req.params.id = ', req.params.id);
  db.deleteProduct(req.params.id, req.params.name);
  res.redirect('/categories/' + req.params.name + '/products');
});
