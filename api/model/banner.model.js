const mongoose = require("mongoose");

const BannerSchemaDef = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    }
}, {
    timestamps: true
})

const BannerModel = mongoose.model("Banner", BannerSchemaDef);

module.exports = BannerModel;