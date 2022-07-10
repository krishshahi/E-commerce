const BannerModel = require("../model/banner.model");
const { deleteImage } = require("../helpers/functions");
class BannerController {
    // to get all the data
    index = (req, res, next) => {
        BannerModel.find()
            .then((banners) => {
                if (banners.length) {
                    //[{... image: "name"}]
                    // http://doamin/uploads/name
                    res.json({
                        result: banners,
                        status: true,
                        msg: "List success"
                    })
                } else {
                    res.json({
                        result: banners,
                        status: false,
                        msg: "No banners available at this moment"
                    })
                }
            })
            .catch((err) => {
                next({ status: 422, msg: JSON.stringify(err) })
            })
    }

    // add banner
    store = (req, res, next) => {
        let data = req.body;

        // run vaidation 
        if (req.file) {
            data.image = req.file.filename;



            let banner = new BannerModel(data);
            banner.save()
                .then((response) => {
                    res.json({
                        result: banner,
                        status: true,
                        msg: "Banner added successfully"
                    })
                })
                .catch((error) => {
                    next({ status: 422, msg: JSON.stringify(error) })
                })
        } else {
            next({ status: 400, msg: "File is required" })
        }


    }

    // get banner by id
    show = (req, res, next) => {
        BannerModel.findById(req.params.id)
            .then((banner) => {
                if (banner) {
                    res.json({
                        result: banner,
                        status: true,
                        msg: "List success"
                    })
                } else {
                    res.json({
                        result: banner,
                        status: false,
                        msg: "Banner not found"
                    })
                }
            })
            .catch((err) => {
                next({ status: 422, msg: JSON.stringify(err) })
            })
    }

    // update operation
    update = (req, res, next) => {
        try {
            let data = req.body;

            // run vaidation 
            if (req.file) {
                data.image = req.file.filename;
            }

            BannerModel.findById(req.params.id)
                .then((banner) => {
                    if (banner.image && data.image) {
                        deleteImage(banner.image)
                    }
                    BannerModel.findByIdAndUpdate(req.params.id, {
                        $set: data
                    }).then((success) => {
                        res.json({
                            result: data,
                            status: true,
                            msg: "Banner updated successfully"
                        })
                    }).catch((err) => {
                        next({ status: 400, msg: "Banner could not be updated at this moment" })
                    })
                })
                .catch((error) => {
                    next({ status: 422, msg: JSON.stringify(error) })
                })
        } catch (error) {
            next({ status: 400, msg: JSON.stringify(error) })
        }
    }

    // banner delete 
    destroy = (req, res, next) => {
        BannerModel.findById(req.params.id)
            .then((banner) => {
                if (banner) {

                    // file delete 
                    if (banner.image) {
                        deleteImage(banner.image);
                    }
                    BannerModel.findByIdAndDelete(req.params.id)
                        .then((ack) => {
                            res.json({
                                result: null,
                                status: true,
                                msg: "Banner deleted successfully."
                            })
                        })
                        .catch((error) => {
                            next({ status: 422, msg: JSON.stringify(error) })
                        })
                } else {
                    res.json({
                        result: null,
                        status: false,
                        msg: "Banner could not be deleted at this moment"
                    })
                }
            })
            .catch((err) => {
                next({ status: 422, msg: JSON.stringify(err) })
            })
    }

    // active 
    getBanners = (req, res, next) => {
        BannerModel.find({
            status: req.params.status
        })
            .then((banners) => {
                if (banners) {
                    res.json({
                        result: banners,
                        status: true,
                        msg: "All active Banners"
                    })
                } else {
                    res.json({
                        result: null,
                        status: false,
                        msg: "No active banners"
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

module.exports = BannerController;