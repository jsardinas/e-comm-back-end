const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  var tags = await Tag.findAll({
    include: [{model: Product}]
  });
  tags = tags.map(x => x.dataValues);
  res.status(200).json(tags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  var tag = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  res.status(200).send(tag.dataValues);
});

router.post('/', async (req, res) => {
  // create a new tag
  if (req.body && req.body.tag_name){
    var tag = await Tag.create(req.body);
    res.status(200).json(tag);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  if (req.body && req.body.tag_name){
    var tag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(tag);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  var deleted = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(deleted);
});

module.exports = router;
