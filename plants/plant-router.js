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

module.exports = router
