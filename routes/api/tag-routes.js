const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    var tags = await Tag.findAll({
      include: [{model: Product}]
    });
    tags = tags.map(x => x.dataValues);
    res.status(200).json(tags);
  }
  catch(e){
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    var tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (tag === null)
      res.status(404).json('tag id not found');
    else
      res.status(200).send(tag.dataValues);
  }
  catch(e){
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    if (req.body && req.body.tag_name){
      var tag = await Tag.create(req.body);
      res.status(200).json(tag);
    }
    else
      res.status(400).json('Missing tag name');
  }
  catch(e){
    res.status(500).json(e);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    if (req.body && req.body.tag_name){
      var updated = await Tag.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      if (updated.length !== 1)
        res.status(500).json('Internal error');
      else if(updated[0] === 1)
        res.status(200).json(`Tag with id ${req.params.id} has been updated`);
      else
        res.status(404).json('Tag id not found');
    }
    else
      res.status(400).json('Missing tag name');
  }
  catch(e){
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    var deleted = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if(deleted === 1)
      res.status(200).json(`Tag with id ${req.params.id} has been deleted`);
    else
      res.status(404).json('Tag id not found');
  }
  catch(e){
    res.status(500).json(e);
  }
});

module.exports = router;
