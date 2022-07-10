const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const categoryRoutes = require("./category.routes");
const bannerRoutes = require("./banner.routes");
const brandRoutes = require("./brand.routes");
const productRoutes = require("./product.routes");
const Role = require("../model/role.model");

const app = express();

app.use(authRoutes);
app.use("/user", (req,res,next) => {req.image_path="uploads/user"; next()}, userRoutes);
app.use("/banner", (req,res,next) => {req.image_path="uploads/banner"; next()}, bannerRoutes)
app.use("/brand", (req,res,next) => {req.image_path="uploads/brand"; next()}, brandRoutes);
app.use("/product", (req,res,next) => {req.image_path="uploads/product"; next()}, productRoutes);

app.get('/roles', (req,res,next) => {
    Role.find()
    .then((roles) => {
        res.json({
            result: roles,
            status: true,
            msg: "roles"
        })
    })
    .catch((err) => {
        next({
            status: 500, msg: JSON.stringify(err)
        })
    })
})

app.use('/category',(req,res,next) => {req.image_path="uploads/category"; next()}, categoryRoutes);
module.exports = app;