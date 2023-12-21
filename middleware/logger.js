const fs = require('fs')


const logger = (req, res, next) => {
    try {
        fs.appendFileSync("logger.text", `${new Date().toISOString()}  ${req.method}  ${req.url}\n`)
    } catch (error) {
        console.log(error);
        res.statu(500).json({ message: "Something Went Wrong...!", status: false, statusCode: 500 })
    }

    next()
}


module.exports = logger