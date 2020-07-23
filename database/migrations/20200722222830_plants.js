
exports.up = async function (knex) {
	await knex.schema.createTable("users", (table) => {
		table.increments("id").unsigned().primary()
		table.text("username").notNull().unique()
        table.text("password").notNull()
        table.text("phoneNumber").notNullable().unique()
	})

    await knex.schema.createTable("plants", (table) => {
        table.increments().unsigned().primary()
        table.integer("user_id").references("id").inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
        table.text("nickname")
            .notNullable()
        table.text("species")
        .notNullable()
        // this probably won't be text I need to look into how to implement this better
        table.text("h2oFrequency")
        .notNullable()
        table.text("image")// an image url put here by the frotend here might work? 
        // I'll have to look into this as well
    })

}

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("plants")
    await knex.schema.dropTableIfExists("users")
}
