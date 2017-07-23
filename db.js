var categories = {
  'Test Category 1': [
    {
      name: 'Test Red',
      id: 1
    },
    {
      name: 'Test Blue',
      id: 2
    }
  ],
  'testCategory2': [
    {
      name: 'Test Car',
      id: 1
    },
    {
      name: 'Test Boat',
      id: 2
    }
  ]
};

module.exports = {
  getCategoryNames: () => {
    return Object.keys(categories).map(name => {
      return name;
    });
  },
  getProductsByCategory: (category) => {
    return categories[category];
  },
  createProduct: (product, category) => {
    if (!product.name) {
      throw new Error('Product name is required!');
    }
    let maxID = Math.max.apply(Math, categories[category].map(product => {
      return product.id;
    }));
    product.id = maxID + 1;
    categories[category].push(product);
  },
  deleteProduct: (id, category) => {
    categories[category] = categories[category].filter(product => {
      return product.id !== Number(id);
    });
  },
  updateProduct: () => {

  },
  deleteCategory: (category) => {
    delete categories[category];
  },
  createCategory: (category) => {
    if (!category.name) {
      throw new Error('Category name is required!');
    }
    categories[category.name] = [];
  }
};
