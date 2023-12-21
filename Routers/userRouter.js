const express = require('express');
const { registerUser, loginUser, changeOnlinestatus, updatePassword } = require('../controller/userController');



const userRouter = express.Router()




userRouter.post('/', registerUser)

userRouter.post('/login', loginUser);


userRouter.post('/changeOnlineStatus', changeOnlinestatus);

userRouter.patch('/updatePassword/:id', updatePassword)






module.exports = userRouter 