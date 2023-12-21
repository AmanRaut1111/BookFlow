const express = require('express')
const userModel = require("../models/userModel")


const checkOnlineUser = async (req, res, next) => {
    try {
        const id = req.params.id
        const checkOnline = await userModel.findById(id)
        if (checkOnline.isOnline === false) {
            return res.status(500).json({ message: "user is not Online...!", status: false, statucode: 500 })
        }


        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong..!", status: false, statusCoe: 500 })
    }
}

module.exports = checkOnlineUser