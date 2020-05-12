const router = require('express').Router();
const {
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
} = require('../controllers/image.controller');
const {
	uploadFeatureImage,
	uploadCatImage,
	uploadUserAvatar,
	uploadCoverPhoto
} = require('../middlewares/multer');

// Feature images routes.
router
	.route('/featureImages')
	.get(getFeatureImages)
	.post(uploadFeatureImage, postFeatureImage);

router
	.route('/featureImages/:id')
	.delete(deleteFeatureImage);

// Category images routes.
router
	.route('/catImages')
	.get(getCatImages)
	.post(uploadCatImage, postCatImage);

router
	.route('/catImages/:id')
	.delete(deleteCatImage);

// User avatars routes.
router
	.route('/userAvatars')
	.get(getUserAvatars)
	.post(uploadUserAvatar, postUserAvatar);
	
router
	.route('/userAvatars/:id')
	.delete(deleteUserAvatar);

// Cover photos routes.
router
	.route('/coverPhotos')
	.get(getCoverPhotos)
	.post(uploadCoverPhoto, postCoverPhoto);
	
router
	.route('/coverPhotos/:id')
	.delete(deleteCoverPhoto);


module.exports = router;