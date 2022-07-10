const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
    name: String,
    street_name: String,
    house_no: String
});
/**
 * CREATE TABLE users (
 *  id int unsigned not null AUTO_INCREMENT PRIMARY KEY,
 *  name varchar(100),
 * email varchar(150) not null UNIQUE,
 * )
 */

// String,
// Number
// Boolean
// Schema
// Date
// ObjectId

const UserSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    role: [{
        type: String,
        enum: ["admin","seller","customer"],
        default: "customer"
    }],
    role_id: {
        type: mongoose.Types.ObjectId,
        ref: "Role"
    },
    address: {
        shipping: AddressSchema,
        billing: AddressSchema,
    },
    reset_token: {
        type: String
    },
    activate_token: {
        type: String
    },
    image: [String]
}, {
    timestamps: true
});

// {role: "admin"}

// _id => PK 
// _v => number, Version 
const User = mongoose.model('User', UserSchemaDef);

module.exports= User;