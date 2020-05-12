const multer = require("multer");
const path = require("path");

// set timestamps to filename.
const filename = function (req, file, cb) {
  cb(null, new Date().toISOString() + "-" + file.originalname);
};

// images format filter.
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);
  mimeType && extName ? cb(null, true) : cb(`Error: Only images accepted!`);
};

// blog images storage.
const blogsImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/images/blogs");
  },
  filename
});

// categories images storage.
const catsImagesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/images/cats");
  },
  filename
});

// user avatar images storage.
const userAvatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/images/users");
  },
  filename
});

// user cover photos storage.
const coverPhotoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/images/covers");
  },
  filename
});

// config blog image upload.
const blogImageConfig = multer({
  storage: blogsImagesStorage,
  limits: { fileSize: 2048 * 2048 },
  fileFilter
});

// config category image upload.
const catImageConfig = multer({
  storage: catsImagesStorage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter
});

// config user avatar upload.
const userAvatarConfig = multer({
  storage: userAvatarStorage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter
});

// config user cover photo upload.
const coverPhotoConfig = multer({
  storage: coverPhotoStorage,
  limits: { fileSize: 2048 * 2048 },
  fileFilter
});

const uploadFeatureImage = blogImageConfig.single("featureImage");
const uploadCatImage = catImageConfig.single("catImage");
const uploadUserAvatar = userAvatarConfig.single("userAvatar");
const uploadCoverPhoto = coverPhotoConfig.single("coverPhoto");

module.exports = {
  uploadFeatureImage,
  uploadCatImage,
  uploadUserAvatar,
  uploadCoverPhoto,
};

// TODO: try to make uploaded directory automatically!