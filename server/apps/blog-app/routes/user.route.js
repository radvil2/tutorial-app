const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");

// define children routes of /users.
router
	.route("/")
	.get(getUsers)
	.post(createUser);

router
	.route("/:id")
	.get(getUser)
	.put(updateUser)
	.delete(deleteUser);

module.exports = router;
