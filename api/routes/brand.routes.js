const router = require("express").Router();
const BrandController = require("../controllers/Brand.controller");
const brandCtrl = new BrandController();
const {loginCheck, adminAccess}  = require("../middleware/auth.middleware");
const imageUploader = require("../middleware/imageUploader.middleware");


router.route("/")
    .get(loginCheck,adminAccess, brandCtrl.index)
    .post(loginCheck,adminAccess, imageUploader.single("image"),  brandCtrl.store);

router.route("/:id")
    .put(loginCheck,adminAccess,imageUploader.single('image'), brandCtrl.update)
    .delete(loginCheck,adminAccess, brandCtrl.destroy)
    .get(brandCtrl.show);


module.exports = router;