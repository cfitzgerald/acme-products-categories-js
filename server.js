const bodyParser = require('body-parser');
const db = require('./db');
const express = require('express');
const override = require('method-override');
const morgan = require('morgan');
const path = require('path');
const pug = require('pug');

const app = express();
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public')); // use the express.static middleware to get express to serve all the statis files in the dir /public in the project root
app.use(bodyParser.urlencoded({extended: false}));
app.use(override('_method')); // use the _method parameter on the url
app.use(morgan('dev'));

app.set('views', './views'); // set the 'views' val to specify the dir where the templates will be stored
app.set('view engine', 'pug'); // set the 'view engine' val to specify the template library (pug)

app.get('/', (req, res, next) => {
  res.render('index', { categoryNames: db.getCategoryNames() });
});

app.use('/categories', require('./routes/categories'));

app.use((err, req, res, next) => {
  res.render('error', { error: err });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`acme-products-categories-js listening on port ${port}`);
});
