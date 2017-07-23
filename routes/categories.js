const db = require('../db');
const router = require('express').Router();

module.exports = router;

router.get('/:name/products', (req, res, next) => {
  res.render('products', {
    category: req.params.name,
    categoryNames: db.getCategoryNames(),
    products: db.getProductsByCategory(req.params.name)
  });
});

router.post('/', (req, res, next) => {
  db.createCategory(req.body);
  res.redirect('/categories/' + req.body.name + '/products');
});

router.delete('/:name', (req, res, next) => {
  db.deleteCategory(req.params.name);
  res.redirect('/');
});

router.post('/:name/products', (req, res, next) => {
  db.createProduct(req.body, req.params.name);
  res.redirect('/categories/' + req.params.name + '/products'); // can this url be more concise?
});

router.delete('/:name/products/:id', (req, res, next) => {
  db.deleteProduct(req.params.id, req.params.name);
  res.redirect('/categories/' + req.params.name + '/products');
});
