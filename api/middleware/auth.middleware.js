const jwt = require("jsonwebtoken");
const config = require("../config/constants");
const User = require("../model/user.model");


const loginCheck = (req, res, next) => {
    let token = null;

    if(req.headers['authorization']){
        token = req.headers['authorization'];
    }

    if(req.headers['x-xsrf-token']){
        token = req.headers['x-xsrf-token'];
    }
    
    if(req.headers['token']){
        token = req.headers['token'];
    }

    if(req.query['token']){
        token = req.query['token'];
    }

    if(!token) {
        next({status: 403, msg: "Unauthorized access"});
    } else {
        // identify if Bearer is used
        let splits = token.split(" ");
        if(splits.length > 1){
            token = splits[1];
        } else {
            token = splits[0]
        }

        console.log(token);

        let data = jwt.verify(token, config.JWT_SECRET);
        if(data) {
            
            let id = data._id;

            User.findById(id)
            .populate('role_id')
            .then((user) => {
                
                if(user) {
                    req.auth_user = user;
                    next();
                } else {
                    next({
                        status: 404,
                        msg: "User does not exists."
                    })
                }
            }) 
            .catch((error) => {
                next({
                    status: 400,
                    msg: "Query error"
                })
            })
        } else {
            next({
                status: 403,
                msg: "Invalid Token or token expired"
            })
        }
    }
}

const adminAccess = (req, res, next) => {
    let role = req.auth_user.role_id;

    if(role.name.toLowerCase() == 'admin') {
        next();
    } else {
        next({
            status: 403,
            msg: "You do not have permission to access this content"
        })
    }
}


const adminSeller = (req, res, next) => {
    let role = req.auth_user.role_id;

    if(role.name.toLowerCase() == 'admin' || role.name.toLowerCase() == 'seller') {
        next();
    } else {
        next({
            status: 403,
            msg: "You do not have permission to access this content"
        })
    }
}

module.exports = {
    loginCheck,
    adminAccess,
    adminSeller
};