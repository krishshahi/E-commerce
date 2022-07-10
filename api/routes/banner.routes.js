const router = require("express").Router();
const BannerController = require("../controllers/banner.controller");
const bannerCtrl = new BannerController();
const {loginCheck, adminAccess}  = require("../middleware/auth.middleware");
const imageUploader = require("../middleware/imageUploader.middleware");


router.route("/")
    .get(loginCheck,adminAccess, bannerCtrl.index)
    .post(loginCheck,adminAccess, imageUploader.single("image"),  bannerCtrl.store);

router.route("/:id")
    .put(loginCheck,adminAccess, imageUploader.single('image'), bannerCtrl.update)
    .delete(loginCheck,adminAccess, bannerCtrl.destroy)
    .get(bannerCtrl.show);

// endpoint
router.get('/status/:status', bannerCtrl.getBanners);

module.exports = router;