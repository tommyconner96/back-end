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
        .where({ user_id: id })
}

async function findPlantByID(user_id, plant_id) {
        return db("plants")
        .where("id", plant_id).first()
        .andWhere("user_id", user_id).first()
}
// this one is only used for create plant, as it doesn't get the user_id passed in
function findPlantByID2(id) {
    return db("plants").where({ id })
}

function createPlant(plant) {
    return db("plants")
        .insert(plant)
        .then(([id]) => findPlantByID2(id))
}

async function removePlant(plant_id, user_id) {
    await db("plants")
        .where("id", plant_id)
        .andWhere("user_id", user_id)
        .del()
}

async function updatePlant(plant_id, user_id, updated) {
    await db("plants")
        .where("id", plant_id)
        .andWhere("user_id", user_id)
        .update(updated)
}

module.exports = {
    findPlants,
    findPlantByID,
    createPlant,
    removePlant,
    updatePlant
}