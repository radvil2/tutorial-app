const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
      minlength: 5,
    },
    category: {
      type: Schema.ObjectId,
      ref: "Category",
      required: true,
      minlength: 20,
      maxlength: 24, // based mongo id length.
    },
    tags: [String],
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
      minlength: 20,
      maxlength: 24,
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      minlength: 5,
      maxlength: 510,
    },
    likedBy: [String],
    likes: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    featureImage: {
      type: String, // note this save only filename;
      maxlength: 255
    }
  },
  { timestamps: true }
);

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 255,
    },
    detail: {
      type: String,
      maxlength: 1000,
    },
    image: {
      type: String, // note: should save only filename;
      trim: true,
      maxlength: 255,
    },
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
      immutable: true,
      minlength: 20,
      maxlength: 24,
    },
  },
  { timestamps: true }
);

exports.Blog = model("Blog", blogSchema);
exports.Category = model("Category", categorySchema);

// TODO: FINISH ALL OF THESE THEN MOVE ONTO COMMENT FUNCIONALITY.