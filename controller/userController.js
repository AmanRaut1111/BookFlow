const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();
const jwt = require("jsonwebtoken");
const SecretKey = "Aman";



const registerUser = async (req, res) => {
    try {
        const { userName, email } = req.body;

        const hashpassword = await bcrypt.hash(req.body.password, 10);

        const user = await userModel({
            userName: userName,
            email: email,
            password: hashpassword,
        });

        const token = jwt.sign({ id: user._id }, SecretKey, { expiresIn: process.env.expiresIn });
        const userData = await user.save();
        if (userData) {
            res
                .status(200)
                .json({
                    message: "User Registered Sucessfully...!",
                    status: true,
                    statusCode: 200,
                    data: userData,
                    token: token,
                });
        } else {
            res
                .status(400)
                .json({
                    message: "Something Went Wrong..!",
                    status: false,
                    statusCoe: 400,
                });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
                message: "Something Went Wrong..!",
                status: false,
                statusCoe: 500,
            });
    }
};

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (userName && password) {
            const user = await userModel.findOne({ userName });

            if (user) {
                let checkPassword = await bcrypt.compare(password, user.password);
                if (checkPassword) {
                    res
                        .status(200)
                        .json({
                            message: "User Login Sucessfully...!",
                            status: true,
                            statusCode: 200,
                        });
                } else {
                    res
                        .status(500)
                        .json({
                            message: "password does not Match...! Try Agin",
                            statusCode: 500,
                            status: false,
                        });
                }
            } else {
                res
                    .status(500)
                    .json({
                        message: "User is Not Found... ! Try Agin",
                        status: false,
                        statusCode: 500,
                    });
            }
        } else {
            res
                .status(500)
                .json({
                    message: "Something Went wrong...!",
                    status: false,
                    statusCode: 500,
                });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
                message: "Something Went wrong...!",
                status: false,
                statusCode: 500,
            });
    }
};

const changeOnlinestatus = async (req, res) => {
    try {
        const { isOnline } = req.body;

        const { id } = req.params.id;

        const client = await userModel.updateOne(
            { id },
            { $set: { isOnline: isOnline }, new: true }
        );
        if (client) {
            res
                .status(200)
                .json({
                    message: "User Online Status Updated",
                    status: true,
                    statusCode: 200,
                    data: client,
                });
        } else {
            res
                .status(400)
                .json({
                    message: "Something Went Wrong..!",
                    status: false,
                    statusCoe: 400,
                });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
                message: "Something Went Wrong..!",
                status: false,
                statusCoe: 500,
            });
    }
};

const updatePassword = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const password = req.body.password;
        const hashpassword = await bcrypt.hash(password, 10);
        const data = await userModel.findByIdAndUpdate(id, {
            $set: { password: hashpassword },
        });

        if (data) {
            res
                .status(200)
                .json({
                    message: "User Password Updated Sucessfully...!",
                    statu: true,
                    statusCode: 200,
                });
        } else {
            res
                .status(400)
                .json({
                    message: "Something Went Wrong..!",
                    status: false,
                    statusCoe: 400,
                });
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
                message: "Something Went Wrong..!",
                status: false,
                statusCoe: 500,
            });
    }
};

const sendMail = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.user,
            pass: process.env.password
        },
    });

    const mailoption = {
        from: process.env.from,
        to: "amanraut7576@gmail.com",
        subject: "welcome to Nodejs",
        text: "Hello From nodejs Team",
    };

    try {
        const result = await transporter.sendMail(mailoption);

        if (result) {
            res.status(200).json({ message: "Mail send sucessfully...!", status: true, statusCode: 200 })
        } else {
            res.status(400).json({ message: "SomeThing Went Wrong...!", status: false, statusCode: 400 })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "SomeThing Went Wrong...!", status: false, statusCode: 500 })
    }
};

module.exports = {
    registerUser,
    loginUser,
    changeOnlinestatus,
    updatePassword,
    sendMail
};
