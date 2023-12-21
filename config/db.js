const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost:27017/BOOKFLOW').then(()=>{
    console.log("connected");
}).catch((error)=>{
   console.log(error);
})