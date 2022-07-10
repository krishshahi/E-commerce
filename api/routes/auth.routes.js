const router = require('express').Router();
const AuthController = require("../controllers/auth.controller");
const authCtrl = new AuthController;
const imageUploader = require("../middleware/imageUploader.middleware");

const {loginCheck} = require("../middleware/auth.middleware")

// router.post('/admin/login', authCtrl.login);

router.post("/login",  authCtrl.login)
router.post("/register", imageUploader.single("image"), authCtrl.register)
router.post('/forget', authCtrl.forgetPassword)
router.post('/reset', authCtrl.resetPassword)
router.post('/activate/:token', authCtrl.activateUser);
// login, logout, register, forget-password, reset-password
module.exports = router;