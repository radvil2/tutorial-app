/** Note that this activity will be set to private purpose */
// later use fawn module for the controller;
const { Schema, model } = require("mongoose");

const activitySchema = new Schema({
  name: {
    type: String,
    enum: [
      "post",
      "like",
      "comment",
      "follow",
      "join",
      "follow",
      "search",
      "mention",
      "tag",
      "share",
    ],
    required: true,
  },
  subject: new Schema({
    name: {
      type: String,
      maxlength: [255, "max 5 chars!"],
      immutable: true,
    },
  }),
  object: new Schema({
    name: {
      type: String,
      maxlength: [255, "max 5 chars!"],
      immutable: true,
    },
  }),
  status: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  message: {
    type: String,
    maxlength: [255, "max 5 chars!"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  nextAction: {
    type: String,
    maxlength: 255,
  },
});

exports.Activity = model("Activity", activitySchema);
