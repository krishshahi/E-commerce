const BrandModel = require("../model/brand.model");
const {deleteImage} = require("../helpers/functions");
class BrandController {

    // to get all the data
    index =(req, res, next) =>{
        BrandModel.find()
        .then((brands) => {
            if(brands.length) {
                res.json({
                    result: brands,
                    status: true, 
                    msg: "List success"
                })
            } else {
                res.json({
                    result: brands,
                    status: false,
                    msg: "No brands available at this moment"
                })
            }
        })
        .catch((err) => {
            next({status: 422, msg: JSON.stringify(err)})
        })
    }

    // add brand
    store = (req, res, next) => {
        let data = req.body;

        // run vaidation 
        if(req.file){
            data.image = req.file.filename;
            // size check login

            let brand = new BrandModel(data);
            brand.save()
            .then((response) => {
                res.json({
                    result: brand,
                    status: true,
                    msg: "Brand added successfully"
                })
            })
            .catch((error) => {
                next({status: 422, msg: JSON.stringify(error)})
            })
        } else {
            next({status: 400, msg: "File is required"})
        }

        
    }

    // get brand by id
    show = (req, res, next) => {
        BrandModel.findById(req.params.id)
        .then((brand) => {
            if(brand) {
                res.json({
                    result: brand,
                    status: true, 
                    msg: "List success"
                })
            } else {
                res.json({
                    result: brand,
                    status: false,
                    msg: "Brand not found"
                })
            }
        })
        .catch((err) => {
            next({status: 422, msg: JSON.stringify(err)})
        })
    }

    // update operation
    update = (req, res, next) => {
        let data = req.body;
        // run vaidation 
        if(req.file){
            data.image = req.file.filename;  
        } 

        BrandModel.findById(req.params.id)
        .then((brand) => {
            if(brand.image) {
                deleteImage(brand.image)
            }
            BrandModel.findByIdAndUpdate(req.params.id, {
                $set: data
            }).then((success) => {
                res.json({
                    result: data,
                    status: true,
                    msg: "Brand updated successfully"
                })    
            }).catch((err) => {
                next({status: 400, msg: "Brand could not be updated at this moment"})
            })
        })
        .catch((error) => {
            next({status: 422, msg: JSON.stringify(error)})
        })
    }

    // brand delete 
    destroy = (req, res, next) => {
        BrandModel.findById(req.params.id)
        .then((brand) => {
            if(brand) {
                
                // file delete 
                if(brand.image){
                    deleteImage(brand.image);
                }
                BrandModel.findByIdAndDelete(req.params.id)
                .then((ack) => {
                    res.json({
                        result: null,
                        status: true, 
                        msg: "Brand deleted successfully."
                    })    
                }) 
                .catch((error) => {
                    next({status: 422, msg: JSON.stringify(error)})
                })
            } else {
                res.json({
                    result: null,
                    status: false,
                    msg: "Brand could not be deleted at this moment"
                })
            }
        })
        .catch((err) => {
            next({status: 422, msg: JSON.stringify(err)})
        })
    }

    // active 
    getBrands = (req, res, next) => {
        BrandModel.find({
            status: req.params.status
        })
        .then((brands) => {
            if(brands) {
                res.json({
                    result: brands,
                    status: true,
                    msg: "All active Brands"
                })
            } else {
                res.json({
                    result: null,
                    status: false, 
                    msg: "No active brands"
                });
            }
        })
        .catch((errr) => {
            next({
                status: 500, msg: JSON.stringify(errr)
            })
        })
    }
}

module.exports = BrandController;