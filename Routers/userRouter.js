const express = require("express");
const {
    registerUser,
    loginUser,
    changeOnlinestatus,
    updatePassword,
    sendMail,
} = require("../controller/userController");
const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/", registerUser);
userRouter.post('/sendmail', sendMail)

userRouter.post("/login", auth, loginUser);

userRouter.post("/changeOnlineStatus/:id", changeOnlinestatus);

userRouter.patch("/updatePassword/:id", updatePassword);

module.exports = userRouter;
