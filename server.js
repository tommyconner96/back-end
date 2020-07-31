const express = require("express")
const helmet = require("helmet")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const authRouter = require("./auth/auth-router")
const plantRouter = require("./plants/plant-router")
const usersRouter = require("./users/users-router")
const restrict = require("./middleware/restrict")

const server = express()
const port = process.env.PORT || 5000
// always comment this out before pushing commits. 
// conflicts with heroku
// require('dotenv').config()
server.use(helmet())
server.use(cookieParser())
server.use(express.json())
// always put this code back before pushing commits. comment out for localhost testing
// CHANGE FOR DEPLOY BASED ON FRONTEND DEPLOY URL. 
// // not until frontend is done or for testing
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 'https://front-end-two-chi.vercel.app')
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie")
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
server.use(cors({
    credentials: true,
    origin: 'https://front-end-two-chi.vercel.app',
}))

server.use("/auth", authRouter)
// users route because plants will be displayed by user ID ex. /users/2/plants
server.use("/users/", restrict(), plantRouter)
server.use("/users/", restrict(), usersRouter)

server.get("/", (req, res, next) => {
    res.status(200).json({
        message: "hi hello welcome",
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong(unknown err)",
    })
})

// server.listen(port, () => {
//     console.log(`running @ port ${port}`)
// })
module.exports = server