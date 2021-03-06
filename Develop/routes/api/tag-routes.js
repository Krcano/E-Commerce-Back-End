const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
   try {
    const allTags = await Tag.findAll({
      include: [Product],
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });
    if (!singleTag) {
      res.status(404).json({ msg: "No tag found with that id!" });
      return;
    }
    res.status(200).json(singleTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag)=>{
    res.status(200).json({message:` You have created a new tag.`})
  })
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((tag)=>{
    res.json({message: `You just updated a tag `})
  });

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where:{id:req.params.id}})
  .then((tag)=>{
  res.json({message: `You deleted a tag.`})
  })
});

module.exports = router;
