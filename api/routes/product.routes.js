const { loginCheck, adminSeller, adminAccess } = require("../middleware/auth.middleware");
const imageUploader = require("../middleware/imageUploader.middleware");
const ProductController = require("../controllers/product.controller");
const prod_ctrl = new ProductController();

const router = require("express").Router();
// 1
// 100 orders 
// 1 
router.route('/')
    .get(prod_ctrl.getAllProducts)
    .post(loginCheck, adminSeller, imageUploader.array('image'), prod_ctrl.addProduct )

router.get("/getproducts/:cat_id", prod_ctrl.getProductByCatId)
router.get("/search", prod_ctrl.getSearchResult)
router.route("/:id")
    .put(loginCheck, adminSeller, imageUploader.array('image'), prod_ctrl.updateProduct)
    .delete(loginCheck, adminAccess, prod_ctrl.deleteProduct)
    .get(prod_ctrl.getProductById)
module.exports = router;