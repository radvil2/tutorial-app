const router = require("express").Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

// define children routes of /categories.
router
	.route("/")
	.get(getCategories)
	.post(createCategory);

router
	.route("/:id")
	.get(getCategory)
	.put(updateCategory)
	.delete(deleteCategory);

module.exports = router;
