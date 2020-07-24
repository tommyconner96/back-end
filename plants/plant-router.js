const express = require("express")
const db = require("../database/data")
const plants = require("./plant-model")

const router = express.Router()

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
        .then(scheme => {
            res.status(201).json({ scheme })
        })
        .catch(err => next(err))
})


module.exports = router
