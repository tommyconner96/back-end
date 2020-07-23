require('dotenv').config()
const express = require("express")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRouter = require("./auth/auth-router")
const plantRouter = require("./plants/plant-router")
const restrict = require("./middleware/restrict")

const server = express()
const port = process.env.PORT || 5000


server.use(helmet())
server.use(cookieParser())
server.use(express.json())
// server.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", 'https://boring-visvesvaraya-e96371.netlify.app' );
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie");
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
//   });
// server.use(cors({
// 	credentials: true,
// 	origin: 'https://boring-visvesvaraya-e96371.netlify.app',
// }))

server.use("/auth", authRouter)
// users route because plants will be displayed by user ID ex. /users/2/plants
server.use("/users/", restrict(), plantRouter)

server.get("/", (req, res, next) => {
    res.json({
        message: "hi hello welcome",
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong(unknown err)",
    })
})

server.listen(port, () => {
    console.log(`running @ port ${port}`)
})