const { deleteImage } = require("../helpers/functions");
const ProductModel = require("../model/product.model");

class ProductController{

    addProduct = (req, res, next) => {
        //
        let data = req.body;
        // validation 
        if(data.title == null){
            next({status: 400, msg: "Title is required."});
        }

        if(data.category.length == 0 ) {
            data.category =  [];
        }

        let price = data.price;
        let after_discount = price;

        // delete data.discount;
        data.discount = {
            discount_type: "amount",
            discount_value: 0
        };
        if(data.discount_type && data.discount_value){
            let dis_type = data.discount_type;
            let dis = data.discount_value;

            data.discount.discount_type = dis_type;
            data.discount.discount_value  = dis 
            
            if(dis_type == 'percentage'){
                after_discount = price - price * dis / 100;
            } else {
                after_discount = price-dis;
            }
        }
        data.after_discount = after_discount;

        if(req.files) {
            let images = [];

            req.files.map((o) => {
                images.push(o.filename)
            })
            
            data.images= images
        }

        if(req.auth_user.role_id.name == 'seller'){
            data.status = 'inactive';
        }

        let prod = new ProductModel(data);
        // new object initialized, _id
        prod.save()
        .then((response) => {
            // response.nInsertedId
            // prod._id

            res.json({
                result: prod,
                status: true,
                msg: "product added successfully."
            })
        })
        .catch((err) => {
            next({status: 500, msg: JSON.stringify(err)})
        })
    }

    getAllProducts = (req, res, next) => {
        ProductModel.find()
        .populate('category')
        .populate('brands')
        .then((products) => {
            res.json({
                result: products,
                status: true,
                msg: "Product fetched"
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                result: null,
                status: false,
                msg: "Error while fetching products"
            })
        })
    }

    updateProduct = (req, res, next) => {
        //
        let data = req.body;
        // validation 
        if(data.title === null){
            next({status: 400, msg: "Title is required."});
        }

        if(data.category.length == 0 ) {
            data.category =  [];
        }

        let price = data.price;
        let after_discount = price;

        data.discount = {
            discount_type: "amount",
            discount_value: 0
        };
        if(data.discount_type && data.discount_value){
            let dis_type = data.discount_type;
            let dis = data.discount_value;

            data.discount.discount_type = dis_type;
            data.discount.discount_value  = dis 
            
            if(dis_type == 'percentage'){
                after_discount = price - price * dis / 100;
            } else {
                after_discount = price-dis;
            }
        }
        data.after_discount = after_discount;
        let images = data.images.split(",");


        if(req.files && req.files.length >0) {
            req.files.map((o) => {
                images.push(o.filename)
            })
            if(images.length !== 0){
                data.images = [
                    ...images
                ]
            }
        } else {
            data.images = images;
        }

        
        // console.log(data);
        ProductModel.findByIdAndUpdate(req.params.id, {
            $set: data
        })
        .then((response) => {
            res.json({
                result: data,
                status: true,
                msg: "product updated successfully."
            })
        })
        .catch((err) => {
            console.log("Err: ", err);
            next({status: 500, msg: JSON.stringify(err)})
        })
    }

    deleteProduct = (req, res, next) => {
        ProductModel.findByIdAndDelete(req.params.id)
        .then((response) => {
            res.json({
                result: null,
                status: true,
                msg: "Product deleted Successfully"
            })
        })
        .catch((error) => {
            res.status(500).json({
                result: null,
                status: false,
                msg: JSON.stringify(error)
            })
        })
    }

    getProductById = (req, res, next) => {
        ProductModel.findById(req.params.id)
        .populate('category')
        .populate('brands')
        .then((product) => {
            res.json({
                result: product,
                status: true,
                msg: "Product fetched"
            })
        })
        .catch((err) => {
            next({status: 500, msg: JSON.stringify(err)});
        })
    }

    getProductByCatId = (req, res, next) => {
        ProductModel.find({
            category: req.params.cat_id
        })
        .populate('category')
        .populate('brands')
        .then((product) => {
            res.json({
                result: product,
                status: true,
                msg: "Product fetched"
            })
        })
        .catch((err) => {
            next({status: 500, msg: JSON.stringify(err)});
        })
    }

    getSearchResult = (req, res, next) => {
        let filters = {}
        if(req.query.q !== "null"){
            
            filters['$or']= [
                {title: { '$regex': req.query.q, '$options': 'i' }},
                {description: { '$regex': req.query.q, '$options': 'i' }}
              ]

        }

        ProductModel.find(filters)
        .populate('category')
        .populate('brands')
        .then((product) => {
            res.json({
                result: product,
                status: true,
                msg: "Product fetched"
            })
        })
        .catch((err) => {
            next({status: 500, msg: JSON.stringify(err)});
        })
    }
}

module.exports = ProductController;