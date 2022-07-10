const { deleteImage } = require("../helpers/functions");
const CategoryModel = require("../model/category.model");
class CategoryController{

    store = (req, res, next) => {
       let data = req.body;

       if(req.file){
           data.image = req.file.filename;
       }
       data["brands"] = data.brands.split(",");
       
       if(!data['parent_id']) {
           data['parent_id'] =  null
       }
       let cat = new CategoryModel(data);
       cat.save()
       .then((response) => {
           res.json({
               result: cat,
               msg: "Category Addedd successfully.",
               status:true
           })
       })
       .catch((err)=> {
        next({status: 500, msg: JSON.stringify(err)});
       })
    }

    index = (req,res,next) => {
        CategoryModel.find()
        .populate("parent_id")
        .populate("brands")
        .then((cats) => {
            res.json({
                result: cats,
                status: true,
                msg: "Category Listed successfully."
            })
        })
        .catch((err) => {
            next({
                status: 500,
                msg: JSON.stringify(err)
            })
        })
    }

    update = (req,res,next)=> {
        let data = req.body;

        if(req.file){
            data.image = req.file.filename;
        }

        if(data.brands) {
            data.brands = data.brands.split(",");
        }
    
        CategoryModel.findById(req.params.id)
        .then((cat) => {    
            let image = cat.image;
            if(data.image){
                deleteImage(image);
            }

            CategoryModel.findByIdAndUpdate(req.params.id, {
                $set: data
            })
            .then((response) => {
                res.json({
                    result: cat ,
                    status: true,
                    msg: "Category Updated successfully."
                })
            })
            .catch((err) => {
                next({
                    status: 422,
                    msg: JSON.stringify(err)
                })
            })
        })
        .catch((err) => {
            next({
                status: 500,
                msg: JSON.stringify(err)
            })
        })
    }

    delete = (req,res,next) => {
        CategoryModel.findById(req.params.id)
        .then((cat) => {
            if(cat.image){
                deleteImage(cat.image);
            }
            CategoryModel.findByIdAndDelete(req.params.id)
            .then((success) => {
                res.json({
                    result: null,
                    status: true,
                    msg: "Category deleted successfully"
                })
            })
            .catch((err) => {
                next({
                    status: 400,
                    msg: JSON.stringify(err)
                })
            })
        })
    }

    show = (req, res,next) => {
        CategoryModel.findById(req.params.id)
        .populate('parent_id')
        .populate('brands')
        .then((cat) => {
            res.json({
                result: cat,
                status: true,
                msg: "Category Fetched successfully."
            })
        })
        .catch((err) => {
            next({
                status: 400,
                msg: JSON.stringify(err)
            })
        })
    }

    getAllParents = (req, res, next) => {
        CategoryModel.find({
            parent_id: null
        })
        .populate("brands")
        .then((cats) => {
            res.json({
                result: cats,
                status: true,
                msg: "Category Listed successfully."
            })
        })
        .catch((err) => {
            next({
                status: 500,
                msg: JSON.stringify(err)
            })
        })
    }

    getAllChilds = (req, res, next) => {
        // parent_id: {$in: req.body.cat_id}
        CategoryModel.find({
            parent_id: req.params.id
        })
        .populate("brands")
        .then((cats) => {
            res.json({
                result: cats,
                status: true,
                msg: "Category Listed successfully."
            })
        })
        .catch((err) => {
            next({
                status: 500,
                msg: JSON.stringify(err)
            })
        })
    }
}

module.exports = CategoryController;