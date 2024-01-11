const jwt = require('jsonwebtoken')

const dotenv = require("dotenv");
dotenv.config();




const auth = (req, res, next) => {
    try {


        let token = req.headers.authorization
        if (token) {
            token = token.split(" ")[1]

            const user = jwt.verify(token, process.env.SecretKey)
        } else {
            return res.status(400).json({ messag: "unauthorized User...!", status: false, statusCode: 400 })
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unauthorised...!", status: false, statusCode: 500 })
    }
}


module.exports = auth