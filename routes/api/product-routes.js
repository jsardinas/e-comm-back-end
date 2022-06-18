const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try{
    var products = await Product.findAll( {
      include: [{ model: Category }, { model: Tag }],
    });
    products = products.map(x => x.dataValues);
    res.status(200).send(products)
  }
  catch(e){
    res.status(500).json(e);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try{
    var product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (product === null)
      res.status(404).json('product id not found');
    else
      res.status(200).send(product.dataValues);
  }
  catch(e){
    res.status(500).json(e);
  }
});

// create new product
router.post('/', (req, res) => {
  try{
    if(req.body){
      Product.create(req.body)
      .then((product) => {
        // if there's product tags, we need to create pairings to bulk create in the ProductTag model
        if (req.body.tagIds && req.body.tagIds.length) {
          const productTagIdArr = req.body.tagIds.map((tag_id) => {
            return {
              product_id: product.id,
              tag_id,
            };
          });
          return ProductTag.bulkCreate(productTagIdArr);
        }
        // if no product tags, just respond
        res.status(200).json(product);
      })
      .then((productTagIds) => res.status(200).json(productTagIds))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    }
    else{
      res.status(400).json('Missing parameters');
    }
  }
  catch(e){
    res.status(500).json(e);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try{
    var updated = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(updated);
    if(updated.length !== 1)
      res.status(500).json('Internal error');
    else if(updated[0] == 0)
      res.status(404).json('product id not found');
    else{
      // find all associated tags from ProductTag
      var productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      if(req.body.tagIds){
        // get list of current tag_ids
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
  
        // create filtered list of new tag_ids
        const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
  
        // figure out which ones to remove
        const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);
  
        // run both actions
        updated = await Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ]);
      }
      res.status(201).json(req.params.id);
    }
  }
  catch(e){
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try{
    var deleted = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (deleted == 1)
      res.status(200).json(`product with id ${req.params.id} has been deleted`);
    else
      res.status(404).json('Tag id not found');
  }
  catch(e){
    res.status(500).json(e);
  }
 
});

module.exports = router;
