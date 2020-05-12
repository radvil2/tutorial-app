const router = require("express").Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  addLike,
  removeLike
} = require("../controllers/blog.controller");

// define children routes of /blogs
router.route("/")
	.get(getBlogs)
	.post(createBlog);

router
	.route("/:id")
	.get(getBlog)
	.put(updateBlog)
	.delete(deleteBlog);

router
	.route("/:id/addLike")
	.put(addLike); // what differs put and patch?
	
router
	.route("/:id/removeLike")
	.put(removeLike);

module.exports = router;
