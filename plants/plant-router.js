const express = require("express")
const db = require("../database/data")
const plants = require("./plant-model")

const router = express.Router()

// CRUD operations are all working for plants!!
// I will be adding better validation and error handling
// next week

//GET plants
router.get("/:id/plants", async (req, res, next) => {
    const { id } = req.params
    plants
        .findPlants(id)
        .then(plants => {
            res.status(200).json(plants)
        })
        .catch((err) => next(err))

})


// POST plant
router.post('/:id/plants', async (req, res, next) => {
    const { id } = req.params

    plants.createPlant({
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
    plants.removePlant(req.params.plantID, req.params.id)
        .then(deleted => {
            res.status(200).json({ message: `successfully deleted plant id ${req.params.plantID} by user id ${req.params.id}`, removed: deleted })
        })
        .catch(err => {
            next(err)
        })
})

// PUT (update) plant BY id
router.put('/:id/plants/:plantID', async (req, res, next) => {

    plants.updatePlant(req.params.plantID, req.params.id, req.body)
        .then(updated => {
            res.status(200).json({ message: `updated plant: ${req.params.plantID}`, updated })
        })
        .catch(err => {
            next(err)
        })
})

module.exports = router
