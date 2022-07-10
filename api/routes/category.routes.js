const router = require("express").Router();
const {loginCheck, adminAccess} = require("../middleware/auth.middleware")
const CategoryController = require("../controllers/category.controller");
const imageUploader = require("../middleware/imageUploader.middleware");

const catCtrl = new CategoryController;

router.route("/")
    .get(catCtrl.index)
    .post(loginCheck, adminAccess, imageUploader.single('image'), catCtrl.store)

router.get('/get-parents', loginCheck, catCtrl.getAllParents)
router.get('/:id/get-childs',catCtrl.getAllChilds )
router.route("/:id")
    .get(catCtrl.show)
    .put(loginCheck, adminAccess, imageUploader.single("image"), catCtrl.update)
    .delete(loginCheck, adminAccess, catCtrl.delete);

module.exports = router;