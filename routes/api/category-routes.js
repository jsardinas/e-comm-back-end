const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  var categories = await Category.findAll({
    include: [{model: Product}]
  });
  categories = categories.map(x => x.dataValues);
  res.status(200).json(categories);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  var category = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  res.status(200).send(category.dataValues);
});

router.post('/', async (req, res) => {
  // create a new category
  if (req.body && req.body.category_name){
    var category = await Category.create(req.body);
    res.status(200).json(category);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  if (req.body && req.body.category_name){
    var category = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(category);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  var deleted = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(deleted);
});

module.exports = router;
