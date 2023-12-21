const express = require("express");
const dotenv = require("dotenv");
var cookieParser = require('cookie-parser')
dotenv.config();

const db = require("./config/db");
const userRouter = require("./Routers/userRouter");
const bookRouter = require("./Routers/bookRouter");

const app = express();

app.use(express.json())

app.use("/user", userRouter);
app.use('/book', bookRouter)

app.post("/", (req, res) => {
  res.json("hello Aman");
});

app.get('/', (req, res) => {
  res.cookie({ name: "Aman" })

  console.log(res.cookie);
})

app.listen(process.env.PORT, () => {
  console.log("server is listening on port", process.env.PORT);
});
