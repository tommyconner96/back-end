const express = require("express")
const bcrypt = require("bcryptjs")
const Users = require("./users-model")
const restrict = require("../middleware/restrict")
const jwt = require("jsonwebtoken")

const router = express.Router()

// POST users is handled in the auth router because it involves registering a user. 
// GET, and DELETE are handled here

// I was having difficulty with PUT. May revisit later but it is not required for MVP

// GET users
router.get("/", restrict(), async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch (err) {
        next(err)
    }
})
// GET users BY id
router.get('/:id', restrict(), async (req, res, next) => {
    const { id } = req.params

    Users.findById(id)
        .then(payload => {
            if (payload) {
                res.json(payload)
            } else {
                res.status(404).json({ message: 'Could not find user with given id.' })
            }
        })
        .catch(err => {
            next(err)
        })
})

// DELETE user BY id
router.delete('/:id', restrict(), async (req, res, next) => {
    const { id } = req.params

    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ removed: deleted })
            } else {
                res.status(404).json({ message: 'Could not find user with given id' })
            }
        })
        .catch(err => {
            next(err)
        })
})



module.exports = router
