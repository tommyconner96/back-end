const db = require("../database/data")

function findPlants(id) {
    return db("plants")
        .join(
            "users", 
            "users.id", 
            "plants.user_id",
            )
        .select(
            "plants.id",
            "plants.user_id",
            "plants.nickname",
            "plants.species",
            "plants.h2oFrequency",
            "plants.image"
        )
        .where({user_id: id})
}

function findPlantByID(id) {
    return db("plants").where({ id })
}

function createPlant(plant) {
    return db("plants")
        .insert(plant)
        .then(([id]) => findPlantByID(id))
}

module.exports = {
    findPlants,
    findPlantByID,
    createPlant,
}