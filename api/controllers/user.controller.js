const User = require("../model/user.model");

const Role = require("../model/role.model");

class UserController {
    user;

    mapUser = (data) => {
        this.user = {
            _id: data._id,
            name: data.name,
            email: data.email,
            status: data.status,
            role_id: data.role,
            image: data.image,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }
    }

    getAllUsers = (req, res, next) => {
        let filter = {
            _id: {$ne: req.auth_user._id}
        };
        if(req.query.type) {
            filter.role = {
                $in: [req.query.type]
            }
        }
        console.log(filter);
        User.find(filter)
        .populate('role_id')
        .then((users) => {
            if(users){
                res.json({
                    result: users,
                    status: true,
                    msg: "List successfull."
                })
            } else {
                res.json({
                    result: null,
                    status: false,
                    msg: "No result found."
                })
            }
        })
        .catch((error) => {
            next({status: 422, msg: JSON.stringify(error)});
        })
    
    }

    getProfile = (req,res,next) => {
        User.findById(req.params.id)
        .populate('role_id')
        .then((user) => {
            if(user) {
                res.json({
                    status: true,
                    result: user,
                    msg: "List"
                })
            } else {
                res.json({
                    status: false,
                    result: null,
                    msg: "User does not exists"
                })
            }
        })
        .catch((err) => {
            res.status(422).json({
                status: false,
                result: null,
                msg: "User does not exists"
            })
        })
    }

    validateData = (data) => {
        let msg = [];
        if(!data.email){
            msg.push("Email is required")
            //return {status: 400, msg: "Email and password is required"};
        }

        if(!data.email.includes("@")){
            msg.push("Invalid Email format, supports only gmail.");
        }

        if(msg.length > 0){
            return {
                status: 400,
                msg: JSON.stringify(msg)
            }
        } else {
            return null;
        }
        
    }

    updateProfile = (req, res,next) => {
        // validation, upload 
        let data = req.body;
        
        let validate = this.validateData(data)
        if(validate){
            next(validate)
        } else {
            if(req.file){
                data.image = req.file.filename;
            }
        
            User.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: data
            })
            .then((ack) => {
                
                if(ack) {
                    res.json({
                        result: data,
                        msg: "User Profile updated successfully.",
                        status: true
                    })
                } else {
                    next({msg: "Error while updating User", status: 400})
                }
            })
            .catch((error) => {
                console.log(error);
                next({msg: JSON.stringify(error), status: 400})
            })
        }
    }

    deleteUser = (req, res, next) => {
        User.findByIdAndDelete(req.params.id)
        .then((res) => {
            if(res) {
                res.json({
                    result: null,
                    status: true,
                    msg: "User deleted successfully."
                })
            } else {
                next({status: 400, msg: "Error while deleting user."});
            }
        })
        .catch((err) => {
            next({status: 422, msg: "Error while query"})    
        })
    }
}

module.exports = UserController;