const mongoose = require("mongoose");
const DiscountType = new mongoose.Schema({
    discount_type: {
        type: String,
        enum: ['percentage','amount']
    },
    discount_value: {
        type: Number
    }

})
const ProductSchemaDef = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {type: String},
    description: {
        type: String,
    },
    category: [{
        type: mongoose.Types.ObjectId,
        ref: "Category"
    }],
    price: {
        type: Number,
        required: true,
        min: 100
    },
    discount: DiscountType,
    after_discount: {
        type: Number
    },
    stock: {
        type: Number
    },
    // sku: {
    //     type: String
    // },
    min_order_qty: {
        type: Number
    },
    images: [String],
    is_featured: {
        type: Boolean,
        default: false
    },
    age_restricted: {
        type: Boolean,
        default: false
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    brands: {
        type: mongoose.Types.ObjectId,
        ref: "Brand"
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    }
}, {
    timestamps: true
});


const ProductModel = mongoose.model('Product', ProductSchemaDef);
module.exports = ProductModel;