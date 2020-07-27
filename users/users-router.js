const express = require("express")
const Users = require("./users-model")
const restrict = require("../middleware/restrict")
const bcrypt = require("bcryptjs")
const router = express.Router()

// POST users is handled in the auth router because it involves registering a user. 
// GET, and DELETE are handled here (UPDATE 7.25.20: DELETE has been taken out as we 
// don't have a need for it and it allows any user to delete any user at the moment
// which is not good)

// update 7.26.20 added PUT

// GET users
router.get("/", async (req, res, next) => {
    try {
        res.json(await Users.find())
    } catch (err) {
        next(err)
    }
})
// GET users BY id
router.get('/:id', async (req, res, next) => {
    const { id } = req.params

    Users
        .findById(id)
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

// PUT (update) user (by ID)
router.put('/:id', async (req, res, next) => {
    const newPass = req.body.password
    const hashPass = await bcrypt.hash(newPass, 12)
    const updateBody = {
        // "username": req.body.username,
        "password": hashPass,
        "phoneNumber": req.body.phoneNumber
    }
    if (!req.body.phoneNumber || !req.body.password) {
        return res.status(400).json({ message: "please provide a password and phone number!" })
    }
    Users
        .findById(id)
        .then(payload => {
            console.log(payload)
            if (!payload) {
                res.status(404).json({ message: 'Could not find user with given id.' })

            } else {
                Users.update(req.params.id, updateBody)
                    .then(updated => {
                        res.status(200).json({ message: `updated user: ${req.params.id}`, updated })
                    })
                    .catch(err => {
                        next(err)
                    })
            }
        })
})

module.exports = router
