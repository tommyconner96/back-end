const express = require("express")
const plants = require("./plant-model")
const users = require("../users/users-model")

const router = express.Router()

// CRUD operations are all working for plants!!
// I will be adding better validation and error handling
// next week

// GET plants
router.get("/:id/plants", async (req, res, next) => {
    const { id } = req.params
    users
        .findById(id)
        .then(payload => {
            if (payload) {
                plants
                    .findPlants(id)
                    .then(plants => {
                        res.status(200).json(plants)
                    })
                    .catch((err) => next(err))
            } else {
                res.status(404).json({ message: 'Could not find user with given id.' })
            }
        })


})

// GET plant BY id
router.get('/:user_id/plants/:plantID', async (req, res, next) => {

    plants
        .findPlantByID(req.params.user_id, req.params.plantID)
        // console.log(req.params.user_id)
        // console.log(req.params.plantID)
        .then(scheme => {
            if (scheme) {
                res.json(scheme)
            } else {
                res.status(404).json({ message: 'Could not find plant with given id.' })
            }
        })
        .catch(err => next(err))
})


// POST plant
router.post('/:id/plants', async (req, res, next) => {
    const { id } = req.params

    if (!req.body.nickname || !req.body.species || !req.body.h2oFrequency) {
        return res.status(400).json({ message: "Please include nickname, species, and h20 frequency" })
    }
    plants
        .createPlant({
            "user_id": id,
            "nickname": req.body.nickname,
            "species": req.body.species,
            "h2oFrequency": req.body.h2oFrequency,
            "image": req.body.image
        })
        .then(newPlant => {
            res.status(201).json({ newPlant })
        })
        .catch(err => next(err))
})

// DELETE plant BY id
router.delete('/:id/plants/:plantID', async (req, res, next) => {

    plants
        .findPlantByID(req.params.id, req.params.plantID)
        .then((plant) => {
            if (plant) {
                plants
                    .removePlant(req.params.plantID, req.params.id)
                    .then(deleted => {
                        res.status(200).json({ message: `successfully deleted plant id ${req.params.plantID} by user id ${req.params.id}`, removed: deleted })
                    })
                    .catch(err => {
                        next(err)
                    })
            } else {
                return res.status(404).json({ message: "invalid user id or plant id" })
            }
        })
})

// PUT (update) plant BY id
router.put('/:id/plants/:plantID', async (req, res, next) => {
    const updateBody = {
        "user_id": req.params.id,
        "id": req.params.plantID,
        "nickname": req.body.nickname,
        "species": req.body.species,
        "h2oFrequency": req.body.h2oFrequency,
        "image": req.body.image
    }
    if (!req.body.nickname || !req.body.species || !req.body.h2oFrequency) {
        res.status(400).json({ message: "please include nickname, species, and h20Frequency in request" })
    }
    plants
        .findPlantByID(req.params.id, req.params.plantID)
        .then((plant) => {
            if (plant) {
                plants
                    .updatePlant(req.params.plantID, req.params.id, updateBody)
                    .then(updated => {
                        res.status(200).json({ message: `updated plant: ${req.params.plantID}`, updated })
                    })
                    .catch(err => {
                        next(err)
                    })
            } else {
                return res.status(404).json({ message: "that plant doesnt exist!" })
            }
        })

})

module.exports = router
