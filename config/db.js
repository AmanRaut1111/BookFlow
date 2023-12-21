const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();


mongoose.connect(process.env.DB).then(() => {
    console.log("connected");
}).catch((error) => {
    console.log(error);
})