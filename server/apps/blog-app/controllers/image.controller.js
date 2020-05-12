const { FeatureImage, CatImage, UserAvatar, CoverPhoto } = require("../models");
const fs = require("fs");

/**
 * @DESC GET featureImage(s).
 * @Route /api/v1/images/featureImages/:authorId.
 */
const getFeatureImages = (req, res, next) => {
  const query = { author: req.query.author };

  // find based on author and sort by newest;
  FeatureImage.find(query)
    .sort("-createdAt")
    .then((images) => {
      return res.json({
        success: true,
        message: `Get feature images succeed...`,
        total: images.length,
        doc: images,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

/**
 * @DESC POST featureImage.
 * @Route /api/v1/images/featureImages.
 */
const postFeatureImage = (req, res, next) => {
  let { name, path, author, featureImage } = req.body;

  if (!req.file) return next(new Error(`No file attached!`));

  name = req.file.filename;
  path = req.file.path;

  FeatureImage.create({ name, path, author })
    .then((result) =>
      res.json({
        success: true,
        message: `POST featureImage succeed...`,
        doc: result,
      })
    )
    .catch((ex) => {
      fs.unlink(req.file.path, (err) => {
        err
          ? next(new Error(`Failed to unlinked!`))
          : next(new Error(`File unlinked succeed...\n${ex}`));
      });
    });
};

/**
 * @DESC DELETE featureImage.
 * @Route /api/v1/images/featureImages/:id.
 */
const deleteFeatureImage = (req, res, next) => {
  res.send(`TODO: Delete feature image from db and filesystem!`);
};

/**
 * @DESC GET catImage(s).
 * @Route /api/v1/images/catImages/:authorId.
 */
const getCatImages = (req, res, next) => {
  const query = { author: req.query.author };

  // find based on author and sort by newest;
  CatImage.find(query)
    .sort("-createdAt")
    .then((images) => {
      return res.json({
        success: true,
        message: `Get cat images succeed...`,
        total: images.length,
        doc: images,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

/**
 * @DESC POST catImage.
 * @Route /api/v1/images/catImages.
 */
const postCatImage = (req, res, next) => {
  let { name, path, author, catImage } = req.body;

  if (!req.file) return next(new Error(`No file attached!`));

  name = req.file.filename;
  path = req.file.path;

  CatImage.create({ name, path, author })
    .then((result) =>
      res.json({
        success: true,
        message: `POST catImage succeed...`,
        doc: result,
      })
    )
    .catch((ex) => {
      fs.unlink(req.file.path, (err) => {
        err
          ? next(new Error(`Failed to unlinked!`))
          : next(new Error(`File unlinked succeed...\n${ex}`));
      });
    });
};

/**
 * @DESC DELETE catImage.
 * @Route /api/v1/images/catImages/:id.
 */
const deleteCatImage = (req, res, next) => {
  res.send(`TODO: Delete cat image from db and filesystem!`);
};

/**
 * @DESC GET userAvatar(s).
 * @Route /api/v1/images/userAvatars/:authorId.
 */
const getUserAvatars = (req, res, next) => {
  const query = { author: req.query.author };

  // find based on author and sort by newest;
  UserAvatar.find(query)
    .sort("-createdAt")
    .then((avatars) => {
      return res.json({
        success: true,
        message: `Get user avatars succeed...`,
        total: avatars.length,
        doc: avatars,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

/**
 * @DESC POST userAvatar.
 * @Route /api/v1/images/userAvatars.
 */
const postUserAvatar = (req, res, next) => {
  let { name, path, author, avatar } = req.body;

  if (!req.file) return next(new Error(`No file attached!`));

  name = req.file.filename;
  path = req.file.path;

  UserAvatar.create({ name, path, author })
    .then((result) =>
      res.json({
        success: true,
        message: `POST user avatar succeed...`,
        doc: result,
      })
    )
    .catch((ex) => {
      fs.unlink(req.file.path, (err) => {
        err
          ? next(new Error(`Failed to unlinked!`))
          : next(new Error(`File unlinked succeed...\n${ex}`));
      });
    });
};

/**
 * @DESC DELETE userAvatar.
 * @Route /api/v1/images/userAvatars/:id.
 */
const deleteUserAvatar = (req, res, next) => {
  res.send(`TODO: Delete avatar from db and filesystem!`);
};

/**
 * @DESC GET userAvatar(s).
 * @Route /api/v1/images/userAvatars/:authorId.
 */
const getCoverPhotos = (req, res, next) => {
  const query = { author: req.query.author };

  // find based on author and sort by newest;
  CoverPhoto.find(query)
    .sort("-createdAt")
    .then((photos) => {
      return res.json({
        success: true,
        message: `Get user cover photos succeed...`,
        total: photos.length,
        doc: photos,
      });
    })
    .catch((error) => {
      return next(error);
    });
};

/**
 * @DESC POST userAvatar.
 * @Route /api/v1/images/userAvatars.
 */
const postCoverPhoto = (req, res, next) => {
  let { name, author, coverPhoto } = req.body;

  if (!req.file) return next(new Error(`No file attached!`));

  name = req.file.filename;

  CoverPhoto.create({ name, author })
    .then((result) =>
      res.json({
        success: true,
        message: `POST cover photo succeed...`,
        doc: result,
      })
    )
    .catch((ex) => {
      fs.unlink(req.file.path, (err) => {
        err
          ? next(new Error(`Failed to unlinked!`))
          : next(new Error(`File unlinked succeed...\n${ex}`));
      });
    });
};

/**
 * @DESC DELETE coverPhotos.
 * @Route /api/v1/images/coverPhotos/:id.
 */
const deleteCoverPhoto = (req, res, next) => {
  res.send(`TODO: Delete cover photo from db and filesystem!`);
};

module.exports = {
  getFeatureImages,
  postFeatureImage,
  deleteFeatureImage,
  getCatImages,
  postCatImage,
  deleteCatImage,
  getUserAvatars,
  postUserAvatar,
  deleteUserAvatar,
  getCoverPhotos,
  postCoverPhoto,
  deleteCoverPhoto,
};
