const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const singleFileDir = "./apps/multer-app/uploads/single";
const multiFileDir = "./apps/multer-app/uploads/multiple";

// Single file upload config
const uploadSingle = multer({
  dest: singleFileDir,
}).single("demo_image");

// File extension filter
const fileFilter1 = (req, file, cb) => {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass 'false', like so:
  cb(null, false);
  // To accept this file pass `true`, like so:
  cb(null, true);
  // You can always pass an error if something goes wrong
  cb(new Error(`File filter failed!`));
};
// The alternative fileFilter
const fileFilter2 = (req, file, cb) => {
  // Set allowed extensions
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check for the extensions
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check for the mime types
  const mimeType = fileTypes.test(file.mimetype);

  mimeType && extName ? cb(null, true) : cb(`Error: Only images accepted!`);
};

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, multiFileDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Multiple file upload config
const uploadMulti = multer({
  storage,
  limits: { fileSize: 2000000 }, // 2MB
  // fileFilter1,
  fileFilter: fileFilter2,
});

// Single file upload route
router.post("/single", (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) res.status(400).send("Failed to upload single file!", err);

    res.send(req.file);
  });
});

// Multiple files upload route
router.post("/multi", uploadMulti.array("demo_images", 4), (req, res) => {
  try {
    res.send(req.files);
  } catch (error) {
    res.status(400).send(`Failed to upload multiple file. ${error}`);
  }
});

module.exports = router;
