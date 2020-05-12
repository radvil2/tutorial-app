const { Category, User, CatImage } = require('../models');
const slugify = require("slugify");

/**
 * @DESC To GET all categories.
 */
const getCategories = async (req, res, next) => {
  try {
    let { select, sort, author } = req.query;
    let option = {};
    if (author) option = { author };
    // get all available cats || get only assigned cats if there is an author query;
    const categories = await Category.find(option).sort(sort).select(select);

    if (!categories) return next(new Error(`No such categories!`));

    return res.json({
      success: true,
      message: `Get all categories succeed...`,
      total: categories.length,
      doc: categories,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To GET category by id.
 */
const getCategory = async (req, res, next) => {
  try {
    let id = req.params.id;

    const category = await Category.findById(id);

    if (!category) return next(new Error(`No such category!`));

    return res.json({
      success: true,
      message: `Get category by id succeed...`,
      doc: category,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To create new category.
 */
const createCategory = async (req, res, next) => {
  try {
    // search for author's username to be cancatinated to the cat's slug;
    const author = await User.findById(req.body.author).select("username");
    // send response if author's username not found;
    if (!author) return next(new Error(`Author's not found!`));
    // slugify category by name;
    if (req.body.name)
      req.body.slug = `${author.username}:${slugify(req.body.name, {
        lower: true,
      })}`;

    let newCategory = new Category({
      ...req.body,
    });

    await newCategory.save();

    return res.json({
      success: true,
      message: `Create category succeed...`,
      doc: newCategory,
    });
  } catch (ex) {
    return next(ex); // sample this!
  }
};

/**
 * @DESC To update existed category by id.
 */
const updateCategory = async (req, res, next) => {
  try {
    if (!req.body.authorId) return next(new Error(`authorId is required!`));
    // search author;
    const author = await User.findById(req.body.authorId).select("username");
    // if author not found;
    if (!author) return next(new Error(`Author not found!`));
    // slugify category;
    if (req.body.name)
      req.body.slug = `${author.username}:${slugify(req.body.name, {
        lower: true,
      })}`;

    if (!req.body.catImageId) return next(new Error(`catImageId is required!`));
    // search catImage;
    const catImage = await CatImage.findById(req.body.catImageId).select(
      "name"
    );
    // if catImage not found;
    if (!catImage) return next(new Error(`Cat image not found!`));
    // set image field;
    req.body.image = catImage.name;
    // find & update category;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    // if find & update failed;
    if (!updatedCategory) return next(new Error(`No such category!`));
    // send response if success;
    return res.json({
      success: true,
      message: `Update category succeed...`,
      doc: updatedCategory,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To delete existed category by id.
 */
const deleteCategory = async (req, res, next) => {
  try {
    const param = req.params.id;

    const deletedCategory = await Category.findByIdAndRemove(param);

    if (!deletedCategory) return next(new Error(`No such category!`));

    return res.json({
      success: true,
      message: `Delete category succeed...`,
      doc: deletedCategory,
    });
  } catch (ex) {
    return next(ex);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
