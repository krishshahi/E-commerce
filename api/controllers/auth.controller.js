const {apiResponse, generateRandomStr, sendEmail, getRoleById} = require("../helpers/functions");
const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");
const config = require("../config/constants");
const { FE_URL } = require("../config/constants");

function generateToken(payload){
    let token = jwt.sign(payload, config.JWT_SECRET);
    return token;
}

class AuthController {

    user;

    mapUser = (data) => {
        this.user = {
            _id: data._id,
            name: data.name,
            email: data.email,
            status: data.status,
            role_id: data.role_id,
            image: data.image,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        }
    }

    login = (req, res, next) => {
        // email
        // role_id = 1
        User.findOne({
            email: req.body.email
        })
        .populate("role_id")
        .then((user) => {
            // pwd
            
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if(result){
                    this.mapUser(user);
                    
                    let token = generateToken({
                        _id: this.user._id,
                        name: this.user.name,
                        role: this.user.role_id.name
                    });

                    // process.env.TZ = user.timezone;
                    res.json({
                        result: {
                            user: this.user,
                            token: token,
                        },
                        msg: "Logged in successfully",
                        status: true
                    })
                } else {
                next({msg: "Credentials does not match.", status: 400})

                }            
            })
            // .then((result) => {
            //     // token 
            //     this.mapUser(user);
            //     let token = generateToken({
            //         _id: this.user._id,
            //         name: this.user.name,
            //         role: this.user.role_id.name
            //     });
            //     res.json({
            //         result: {
            //             user: this.user,
            //             token: token,
            //         },
            //         msg: "Logged in successfully",
            //         status: true
            //     })
            // })
            // .catch((error)=>{
            //     next({msg: "Credentials does not match.", status: 400})
            // })
        })
        .catch((err) => {
            next({msg: "User not found", status: 403})
        })

    }

    validateData = (data) => {
        let msg = [];
        if(!data.email ){
            msg.push("Email is required")
            //return {status: 400, msg: "Email and password is required"};
        }

            

        if(!data.email.includes("@")){
            msg.push("Invalid Email format, supports only gmail.");
        }

        // if(data.password !== data.confirm_password){
        //     msg.push("Password and confirm password does not match")
        //     // return {status: 400, msg: "Password and confirm password does not match"};
        // }
        // let roles = ['admin','seller','customer'];

        // if(!roles.includes(data.role)){
        //     msg.push("Invalid role")
        //     // return {status: 400, msg: "Invalid role"};
        // }

        if(msg.length > 0){
            return {
                status: 400,
                msg: JSON.stringify(msg)
            }
        } else {
            return null;
        }
        
    }

    register = async (req, res, next) => {
        // validation, upload 
        let data = req.body;
        
        let validate = this.validateData(data)
        if(validate){
            next(validate)
        } else {
            if(req.file){
                data.image = req.file.filename;
            }

            if(data.confirm_password){
                delete data.confirm_password;
            }

            if(data.password) {
                data.password = bcrypt.hashSync(data.password, 10);
            } else {
                data.password = bcrypt.hashSync("password123", 10);
            }

            let token = generateRandomStr(100);
            data.activate_token = token;
            data.role_id = data.role;
            let role = await getRoleById(data.role_id);
            data.role = [role.name.toLowerCase()];
            
            let user = new User(data);

            user.save()
            .then((ack) => {
                // send activation email
                let msg = "Dear "+data.name+" <br />";
                msg += "Your account has been registered. Please click the link below in order to activate your account: ";
                msg += "<a href='"+FE_URL+"/activate/"+token+"'>"+FE_URL+"/activate/"+token+"</a>";
                msg += "Regards, <br/>";

                sendEmail(data.email, "Activate your account.", msg);

                res.json({
                    result: user,
                    msg: "Registerd successfully.",
                    status: true
                })
            })
            .catch((error) => {
                next({msg: JSON.stringify(error), status: 400})
            })
        }
    }

    forgetPassword = (req, res, next) => {
        User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if(user){
                let token = generateToken({
                    id: user._id
                });
                User.findOneAndUpdate({
                    email: req.body.email
                }, {
                    $set: {
                        reset_token: token
                    }
                })
                .then((success) => {
                    // send a email    
                    // FE Url
                    let link = config.FE_URL+"/reset-password?token="+token;
                    // SMTP 

                    // server sendmail
                    // mailtrap, sendgrid => abc.com, localhost 
                    // port: 25, 2525, 465, 587
                    // isp: ip:port

                    let transporter = nodemailer.createTransport({
                        host: process.env.SMTP_HOST || config.SMTP_HOST,
                        port: process.env.SMTP_PORT || config.SMTP_PORT,
                        auth: {
                            user: process.env.SMTP_USER || config.SMTP_USER,
                            pass: process.env.SMTP_PWD || config.SMTP_PWD
                        }
                    });

                    transporter.verify((err, success) => {
                        console.log("Error: ", err);
                        console.log('Success: ', success);
                    })

                    let msg = `Dear ${user.name} <br/>`;
                    msg += "You have requested for the password reset. Please click the link below or copy paste url in the browser: <br >";
                    msg += `<a href='${link}'>${link}</a> <br />`;
                    msg += "Regards,<br/>System Admin<br/>";
                    msg += "<small><em>Please do not reply to this email</em></small>"

                    console.log(msg);

                    transporter.sendMail({
                        from: process.env.ADMIN_EMAIL || config.ADMIN_EMAIL,
                        to: req.body.email,
                        subject: "Reset-Password",
                        // text: "Plain text",
                        html: msg
                    }, (err, success) => {
                        console.log("here");
                        console.log("Error: ", err)
                        console.log("success; ", success);
                    })
                    // sms feature , sms provide

                    res.json({
                        res: user,
                        status: true,
                        msg: "Success"
                    })

                })
                .catch((error) => {
                    next({status: 400, msg: "Cannot set Token"})
                })
            } else {
                next({status: 400, msg: "User not found"})
            }
        })
        .catch((error) => {
            next({status: 422, msg: JSON.stringify(error)})
        })
    }

    resetPassword = (req, res, next) => {
        // token, password, confirm_password
        let token = req.query.token;
        let password = req.body.password;
        let confirm = req.body.confirm_password;

        if(password != confirm || password.length < 8){
            next({status: 400, msg: "Password and confirm password must match and must be 8 character long"});
        }
        User.findOne({
            reset_token: token
        })
        .then((user) => {
            if(user) {
                // reset here
                let pass = bcrypt.hashSync(password, 10);

                user.password = pass;

                user.save()
                .then((success) => {
                    res.json({
                        result: user,
                        status: 200,
                        msg: "Password updated successfully."
                    })
                }).catch((err) => {
                    next({
                        status: 400,
                        msg: "Error while updating password."
                    })
                })

            } else {
                // token expired or broken 
                next({status: 400, msg: "token expoired or already used"})
            }
        })
        .catch((error) => {
            next({status: 422, msg: "Error while db query"})
        })
    }

    activateUser = (req, res, next) => {
        User.findOne({
            activate_token: req.params.token
        })
        .then((user) => {
            if(user) {
                let data = {
                    activate_token: null,
                    status: "active",
                    password: bcrypt.hashSync(req.body.password, 10)
                }
                User.findByIdAndUpdate(user._id, {
                    $set: data
                })
                .then((success) => {
                    res.json({
                        result: user,
                        status: true,
                        msg: "Your account has been activated successfully."
                    })
                }) 
                .catch((err)=> {
                    next({status: 400, msg: JSON.stringify(err)})
                })
            } else {
                next({status: 422, msg: "Token already used or expired."})
            }
        })
        .catch((error) => {
            next({status: 400, msg: JSON.stringify(error)})
        })
    }

}

module.exports = AuthController;