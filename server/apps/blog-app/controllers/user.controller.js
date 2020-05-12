const { User, UserAvatar, CoverPhoto } = require("../models");

/**
 * @DESC To GET all users.
 */
const getUsers = async (req, res, next) => {
  try {
    let { select, sort } = req.query;

    const users = await User.find().sort(sort).select(select);

    if (!users) return next(res.status(400).send(`No such users!`));

    return res.json({
      success: true,
      message: `Get all users succeed...`,
      total: users.length,
      doc: users,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To GET user by id.
 */
const getUser = async (req, res, next) => {
  try {
    let id = req.params.id;

    const user = await User.findById(id);

    if (!user) return next(res.status(400).send(`No such user!`));

    return res.json({
      success: true,
      message: `Get user by id succeed...`,
      doc: user,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To create new user.
 */
const createUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const existedUser = await User.findOne({ username });

    if (existedUser) return res.send(`Username ${username} already existed!`);

    const createdUser = await new User({
      ...req.body,
    }).save();

    if (!createdUser) return next(new Error(`Failed to create user!`));

    return res.json({
      success: true,
      message: `Create user succeed...`,
      doc: createdUser,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To update existed user by id.
 */
const updateUser = async (req, res, next) => {
  try {
    const param = req.params.id;

    // set user avatar
    const avatarId = req.body.avatarId;

    if (!avatarId) return next(new Error(`avatarId is required!`));

    const fetchedAvatar = await UserAvatar.findById(avatarId).select("name");

    if (!fetchedAvatar) return next(new Error(`Avatar not found!`));

    // set cover photo
    const coverPhotoId = req.body.coverPhotoId;

    if (!coverPhotoId) return next(new Error(`coverPhotoId is required!`));

    const fetchedCoverPhoto = await CoverPhoto.findById(coverPhotoId).select(
      "name"
    );

    if (!fetchedCoverPhoto) return next(new Error(`Cover photo not found!`));

    req.body.avatar = fetchedAvatar.name;
    req.body.coverPhoto = fetchedCoverPhoto.name;

    const updatedUser = await User.findByIdAndUpdate(
      param,
      { ...req.body },
      { new: true }
    );

    if (!updatedUser) return next(new Error(`User not found!`));

    return res.json({
      success: true,
      message: `Update user succeed...`,
      doc: updatedUser,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To delete existed user by id.
 */
const deleteUser = async (req, res, next) => {
  try {
    const param = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    // required field;
    if (!username || !password) return res.json(`This field is required!`);
    // Look for user by param;
    const user = await User.findById(param);
    // if not found send res;
    if (!user) return res.send(`No such user!`);
    // match username;
    if (username !== user.username)
      return res.send(`Failed to match username!`);
    // match password;
    if (password !== user.password) return res.send(`Wrong password!`);
    // do delete user;
    const deletedUser = await user.remove();
    // If deletion failed;
    if (!deletedUser)
      return next(new Error(res.status(400).send(`Failed to delete user!`)));
    // Finale!!;
    return res.json({
      success: true,
      message: `Delete user succeed...`,
      doc: deletedUser.username,
    });
  } catch (ex) {
    return next(ex);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
