const mongoose = require("mongoose");

const BrandSchemaDef = new mongoose.Schema({
    title: String,
    image: String,
    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'inactive'
    }
}, {
    timestamps: true
})

const BrandModel = mongoose.model("Brand", BrandSchemaDef);

module.exports = BrandModel;