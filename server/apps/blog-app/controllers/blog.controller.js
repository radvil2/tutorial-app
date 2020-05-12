const { Blog, FeatureImage, Activity, User } = require('../models');
const slugify = require("slugify");

/**
 * @DESC To GET all blogs.
 */
const getBlogs = async (req, res, next) => {
  try {
    let { select, sort, page, limit } = req.query;
    // fallback to default if no page was specified;
    page = parseInt(page) || 1;
    // fallback to default if no limit was set;
    limit = parseInt(limit) || 99;
    // hell no, wtf is this? this is how we calculate page skip;
    skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate("category", "name slug")
      .populate("author", "name username avatar")
      .sort(sort)
      .select(select)
      .limit(limit)
      .skip(skip);

    if (!blogs) return next(new Error(`No such blogs!`));

    return res.json({
      success: true,
      message: `Get all blogs succeed...`,
      total: blogs.length,
      doc: blogs,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To GET blog by id.
 */
const getBlog = async (req, res, next) => {
  try {
    let id = req.params.id;

    const blog = await Blog.findById(id)
      .populate("author", "name")
      .populate("category", "name");

    if (!blog) return next(new Error(`No such blog!`));

    return res.json({
      success: true,
      message: `Get blog by id succeed...`,
      doc: blog,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To create new blog.
 */
const createBlog = async (req, res, next) => {
  try {
    // check title is not empty and automatically make slug for it, but in the schema titla required definition has already been set to true;
    if (req.body.title)
      req.body.slug = `${slugify(req.body.title, {
        lower: true,
      })}+${new Date().toISOString()}`;

    if (!req.body.featureImageId)
      return next(new Error(`featureImageId is required!`));

    const fetchedFeatureImage = await FeatureImage.findById(
      req.body.featureImageId
    ).select("name");

    if (!fetchedFeatureImage) return next(new Error(`featureImage not found!`));

    req.body.featureImage = fetchedFeatureImage.name;

    // define new blog schema based on the request body;
    let newBlog = new Blog({
      ...req.body,
    });
    // saving new blog schema as one document to the database's blog collection;
    await newBlog.save();

    const subject = await User.findById(req.body.author);
    if (!subject) return next(new Error(`subject not found!`));

    let newActity = new Activity({
      name: 'post',
      subject: {
        _id: subject._id,
        name: subject.name,
      },
      object: {
        _id: newBlog._id,
        name: newBlog.title
      },
      message: `${subject.name} created a new blog.`, // later give one property of the blog named type!
    });
    // save activity;
    await newActity.save();
    // returning json as successful response to the client;
    return res.json({
      success: true,
      message: `Create blog succeed...`,
      activity: newActity.message,
      doc: {
        title: newBlog.title,
        author: newBlog.author,
        createdAt: newBlog.createdAt,
      },
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To update existed blog by id.
 */
const updateBlog = async (req, res, next) => {
  try {
    // define update blog parameter;
    const param = req.params.id;
    // check if there is a title attached to the request body, then do slugify;
    if (req.body.title)
      req.body.slug = `${slugify(req.body.title, {
        lower: true,
      })}+${new Date().toISOString()}`;

    if (!req.body.featureImageId)
      return next(new Error(`featureImageId is required!`));

    const fetchedFeatureImage = await FeatureImage.findById(
      req.body.featureImageId
    ).select("name");

    if (!fetchedFeatureImage) return next(new Error(`featureImage not found!`));

    req.body.featureImage = fetchedFeatureImage.name;

    // find and update blog based on the id attached as the request parameter;
    const updatedBlog = await Blog.findByIdAndUpdate(
      param,
      { ...req.body },
      // this { new: true } means that if all processes passed, we're gonna sent the updated doc as the response to the client instead the older one;
      { new: true }
    );
    // handle exception if it failed during update
    if (!updatedBlog) return next(new Error(`No such blog!`));

    // create a new activity;
    const subject = await User.findById(updatedBlog.author);
    if (!subject) return next(new Error(`subject not found!`));

    let newActity = new Activity({
      name: 'post', // should be delete? or blog? instead of post?
      subject: {
        _id: subject._id,
        name: subject.name,
      },
      object: {
        _id: updatedBlog._id,
        name: updatedBlog.title
      },
      status: 'private',
      message: `${subject.name} updated a blog with id ${updatedBlog._id}.`,
    });

    await newActity.save();

    // if all processes succeed, send back the final response to the client;
    return res.json({
      success: true,
      message: `Update blog succeed...`,
      activity: newActity.message,
      doc: updatedBlog,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To delete existed blog by id.
 */
const deleteBlog = async (req, res, next) => {
  try {
    const param = req.params.id;

    const deletedBlog = await Blog.findByIdAndRemove(param).select(
      "title author"
    );

    if (!deletedBlog) return next(new Error(new Error(`No such blog!`)));

    const subject = await User.findById(deletedBlog.author);
    if (!subject) return next(new Error(`subject not found!`));

    let newActity = new Activity({
      name: 'post',
      subject: {
        _id: subject._id,
        name: subject.name,
      },
      object: {
        _id: deletedBlog._id,
        name: deletedBlog.title
      },
      status: 'private',
      message: `${subject.name} deleted a blog with id ${deletedBlog._id}.`,
    });

    await newActity.save();

    return res.json({
      success: true,
      message: `Delete blog succeed...`,
      activity: newActity.message,
      doc: deletedBlog,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To add like to the selected blog by id.
 */
const addLike = async (req, res, next) => {
  try {
    // define blog parameter;
    const param = req.params.id;
    // define the selected blog;
    const blog = await Blog.findById(param).select("likes likedBy author");
    // check if the selected blog exists;
    if (!blog) return next(new Error(`No such blog!`));
    // Check if user already like the blog;
    if (blog.likedBy.includes(req.body.userName))
      res.send(`Damn it!, Who are you? Likes Bomber?`);
    // if user didn't like before increment likes total;
    blog.likes++;
    // push new user's name to the likedBy array;
    blog.likedBy.push(req.body.userName);
    // saving updated blog;
    await blog.save();

    let newActity = new Activity({
      name: 'like',
      subject: {
        _id: req.body.userId,
        name: req.body.userName,
      },
      object: {
        _id: blog._id,
        name: blog.title
      },
      message: `${req.body.userName} liked a blog with id ${blog._id}.`,
    });

    await newActity.save();

    // TODO: This saved the liks, but not the activity. Why?

    // return the final response to the client;
    return res.json({
      success: true,
      message: `Like post succeed...`,
      activity: newActity.message,
      doc: blog,
    });
  } catch (ex) {
    return next(ex);
  }
};

/**
 * @DESC To remove like to the selected blog by id.
 */
const removeLike = async (req, res, next) => {
  try {
    // define blog parameter;
    const param = req.params.id;
    // define selected blog by the parameter;
    const blog = await Blog.findById(param).select("likes likedBy");
    // check if the selected blog exists then handle the exception;
    if (!blog) return next(new Error(`No such blog!`));
    // Check if user is there in array of likedBy;
    if (!blog.likedBy.includes(req.body.userName))
      return next(new Error(res.send(`None to unlike!`)));
    // decrementing likes total;
    blog.likes--;
    // another method besides filter() to remove item of the likes array
    blog.likedBy.splice(blog.likedBy.indexOf(req.body.userName), 1);
    // set a new likedBy array by excluding the selected user;
    // blog.likedBy = blog.likedBy.filter((person) => {
    //   return person !== req.body.name;
    // });
    // saving updated likes and likedBy properties in the db's blog collection;
    await blog.save();

    let newActity = new Activity({
      name: 'like',
      subject: {
        _id: req.body.userId,
        name: req.body.userName,
      },
      object: {
        _id: blog._id,
        name: blog.title
      },
      message: `${req.body.userName} unliked a blog with id ${blog._id}.`,
    });

    await newActity.save();

    // return the final response to the client as a success;
    return res.json({
      success: true,
      message: `Unlike post succeed...`,
      activity: newActity.message,
      doc: blog,
    });
  } catch (ex) {
    return next(ex);
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  addLike,
  removeLike,
};
