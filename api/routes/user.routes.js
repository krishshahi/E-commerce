const router = require("express").Router();
const UserController = require("../controllers/user.controller");
const {loginCheck, adminAccess} =  require("../middleware/auth.middleware");
const imageUploader = require("../middleware/imageUploader.middleware");

const usrCtl = new UserController();

router.route('/')
        .get(loginCheck, adminAccess, usrCtl.getAllUsers);

router.route("/:id")
        .put(loginCheck, imageUploader.single("image"), usrCtl.updateProfile)
        .delete(loginCheck, adminAccess, usrCtl.deleteUser)
        .get(loginCheck, usrCtl.getProfile);

module.exports = router;