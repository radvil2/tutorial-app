const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true, // we're going to set timestamps into it.
    maxlength: 255,
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User',
    immutable: true,
    required: true,
    minlength: 20,
    maxlength: 24,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

exports.FeatureImage = model("FeatureImage", imageSchema);
exports.CatImage = model("CatImage", imageSchema);
exports.UserAvatar = model("UserAvatar", imageSchema);
exports.CoverPhoto = model("CoverPhoto", imageSchema);