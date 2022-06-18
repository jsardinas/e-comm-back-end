const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    var categories = await Category.findAll({
      include: [{model: Product}]
    });
    categories = categories.map(x => x.dataValues);
    res.status(200).json(categories);
  }
  catch(e){
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    var category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (category === null)
      res.status(404).json('Category id not found');
    else
      res.status(200).json(category.dataValues);
  }
  catch(e){
     res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try{
    if (req.body && req.body.category_name){
      var category = await Category.create(req.body);
      res.status(201).json(category);
    }
    else{
      res.status(400).json('Missing category name');
    }
  }
  catch(e){
    res.status(500).json(e);
  }
  
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    if (req.body && req.body.category_name){
      var updated = await Category.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      if (updated.length !== 1)
        res.status(500).json('Internal error');
      else if(updated[0] === 1)
        res.status(200).json(`Category with id ${req.params.id} has been updated`);
      else
        res.status(404).json('Category id not found');
    }
    else
      res.status(400).json('Missing category name');
  }
  catch(e){
    res.status(500).json(e);
  }
  
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    var deleted = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(deleted === 1)
      res.status(200).json(`Category with id ${req.params.id} has been deleted`);
    else
      res.status(404).json('Category id not found');
  }
  catch(e){
    res.status(500).json(e);
  }
});

module.exports = router;
