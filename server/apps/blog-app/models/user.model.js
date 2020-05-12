const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [255, "Too many!"],
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
      maxlength: [255, "Too many!"],
      // TODO: validate username with regex.
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: [255, "Too many!"],
      // TODO: find regex to validate email.
    },
    password: {
      type: String,
      // TODO: find regex to validate password.
      // required: true,
      // minlength: 8,
      // maxlength: 255,
    },
    bio: {
      type: String,
      maxlength: [500, "Maximum 500 chars!"],
    },
    phone: {
      type: String,
      // TODO: find regex how to validate phone along with the limit?
      // minlength: 8,
      maxlength: [20, "Maximum 20 chars!"],
    },
    avatar: {
      type: String, // should save filename here;
      trim: true,
      maxlength: 255,
    },
    coverPhoto: {
      type: String,
      trim: true,
      maxlength: 255,
    },
    lastLogin: Date, // need to set the login route first;

    // optionals
    websites: [
      {
        type: String,
        maxlength: 255,
        lowercase: true,
      },
    ],
    socialMedias: [
      {
        type: String,
        maxlength: 255,
      },
    ],
    skills: [
      {
        type: String,
        maxlength: 255,
      },
    ],
    birthday: Date,
    gender: {
      type: String,
      enum: ["male", "female", "unknown"],
    },
    interestedIn: {
      type: String,
      enum: ["male", "female", "other"],
    },
    languages: [
      {
        type: String,
        maxlength: 255,
      },
    ],
    religion: {
      type: String,
      maxlength: 255,
    },
    nicknames: [
      {
        type: String,
        maxlength: 255,
      },
    ],
    relationship: {
      type: String,
      enum: ["single", "married", "divorce", "complicated"],
    },
    nation: {
      type: String,
      maxlength: 255,
    },
    province: {
      type: String,
      maxlength: 255,
    },
    city: {
      type: String,
      maxlength: 255,
    },
    region: {
      type: String,
      maxlength: 255,
    },
    residence: {
      type: String,
      maxlength: 255,
    },
    favoriteQuote: {
      type: String,
      maxlength: 255,
    },
    familyMembers: [
      {
        type: String, // later change this to object id and reference each position of the family member;
        maxlength: 255,
      },
    ],
    highSchools: [
      {
        type: String,
        maxlength: 255,
      },
    ],
    colleges: [
      {
        type: String,
        maxlength: 255,
      },
    ],
  },
  { timestamps: true }
);

exports.User = model("User", userSchema);
