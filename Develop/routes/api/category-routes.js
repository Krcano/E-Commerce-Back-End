const router = require("express").Router();
const { Category, Product, Tag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!singleCategory) {
      res.status(404).json({ msg: "No categories found with that id!" });
      return;
    }
    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async(req, res) => {
  // create a new category
  Category.create(req.body).then((category) => {
    res.status(200).json({message:`You have created a new category`});
  });
});

router.put("/:id", async(req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((category)=>{
    res.json({message: `You just updated your ${category} category`})
  });
});

router.delete("/:id", async(req, res) => {
  // delete a category by its `id` value
  Category.destroy({where:{id:req.params.id}})
  .then((category)=>{
  res.json({message: `You deleted ${category}.`})
  })
});

module.exports = router;
