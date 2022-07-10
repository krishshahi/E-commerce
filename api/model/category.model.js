const mongoose = require("mongoose");
const attribute = new mongoose.Schema({
    name: String,
    value: String
})
const CategorySchemaDef = new mongoose.Schema({
    title: String,
    summary: String,
    image: String,
    // attributes: [attribute],
    brands: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Brand",
            default: null
        }
    ],
    parent_id: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null
    },
    status: {
        type: String,
        enum: ['active','inactive'],
        default: "inactive"
    }
}, {
    timestamps: true
});

const CategoryModel = mongoose.model("Category", CategorySchemaDef);
module.exports = CategoryModel;