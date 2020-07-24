const db = require("../database/data")

async function add(user) {
    const [id] = await db("users").insert(user)
    return findById(id)
}

function find() {
    return db("users").select("id", "username", "phoneNumber")
}

function findBy(filter) {
    return db("users")
        .select("id", "username", "password", "phoneNumber")
        .where(filter)
}

function findById(id) {
    return db("users")
        .select("id", "username", "phoneNumber")
        .where({ id })
        .first()
}

function remove(id) {
    if (!id) {
        return null
    }
    return db("users")
        .where("id", id)
        .del()
}
function update(changes, id) {
    return db("users")
        .where({ id })
        .update(changes)
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    update
}
