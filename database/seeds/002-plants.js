
exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        { user_id: 1, nickname: 'str', species: 'str', h2oFrequency: 1, image: 'url' },
        { user_id: 1, nickname: 'planty mcplantface', species: 'plantius', h2oFrequency: 2, image: 'url' },
        { user_id: 1, nickname: 'string', species: 'string', h2oFrequency: 1, image: 'url' },
        { user_id: 2, nickname: 'Acanthaceae', species: 'Acanthaceae', h2oFrequency: 4, image: 'url' },
        { user_id: 2, nickname: 'nickname here', species: 'Cephalotaceae ', h2oFrequency: 3, image: 'url' },
        { user_id: 3, nickname: 'pretty plant', species: 'Saururaceae', h2oFrequency: 2, image: 'url' },
      ])
    })
}
