
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel');




const registerUser = async (req, res) => {

    try {
        const { userName, email, password } = req.body

        const hashpassword = await bcrypt.hash(req.body.password, 10);

        const user = await userModel({
            userName: userName,
            email: email,
            password: hashpassword
        });

        const userData = await user.save();
        if (userData) {
            res.status(200).json({ message: "User Registered Sucessfully...!", status: true, statusCode: 200, data: userData })
        } else {
            res.status(400).json({ message: "Something Went Wrong..!", status: false, statusCoe: 400 })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong..!", status: false, statusCoe: 500 })
    }
}


const loginUser = async (req, res) => {
    try {

        const { userName, password } = req.body

        if (userName && password) {
            const user = await userModel.findOne({ userName })

            if (user) {
                let checkPassword = await bcrypt.compare(password, user.password)
                if (checkPassword) {
                    res.status(200).json({ message: "User Login Sucessfully...!", status: true, statusCode: 200 })
                } else {
                    res.status(500).json({ message: "password does not Match...! Try Agin", statusCode: 500, status: false })
                }
            } else {
                res.status(500).json({ message: "User is Not Found... ! Try Agin", status: false, statusCode: 500 })
            }
        } else {
            res.status(500).json({ message: "Something Went wrong...!", status: false, statusCode: 500 })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went wrong...!", status: false, statusCode: 500 })
    }
}



const changeOnlinestatus = async (req, res) => {
    try {
        const { _id, isOnline } = req.body


        if (!_id) {
            return res.status(500).json({ message: "Please Provide User Information...!", status: false, statusCode: 500 })
        }
        const client = await userModel.updateOne({ _id }, { $set: { isOnline: isOnline }, new: true });
        if (client) {
            res.status(200).json({ message: "User Online Status Updated", status: true, statusCode: 200, data: client })
        } else {
            res.status(400).json({ message: "Something Went Wrong..!", status: false, statusCoe: 400 })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong..!", status: false, statusCoe: 500 })
    }
}

const updatePassword = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const password = req.body.password
        const hashpassword = await bcrypt.hash(password, 10)
        const data = await userModel.findByIdAndUpdate(id, { $set: { password: hashpassword } });

        if (data) {
            res.status(200).json({ message: "User Password Updated Sucessfully...!", statu: true, statusCode: 200 })
        } else {
            res.status(400).json({ message: "Something Went Wrong..!", status: false, statusCoe: 400 })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong..!", status: false, statusCoe: 500 })

    }
}

module.exports = {
    registerUser,
    loginUser,
    changeOnlinestatus,
    updatePassword
}