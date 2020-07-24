
exports.seed =async  function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      // running without user_id forieng key here because
      // that's the only way I could get the seed to
      // populate the DB
      // 002-plants.js adds the user_id
      return knex('plants').insert([
        { nickname: 'str', species: 'str', h2oFrequency: 1, image: 'url' },
        { nickname: 'planty mcplantface', species: 'plantius', h2oFrequency: 2, image: 'url' },
        { nickname: 'string', species: 'string', h2oFrequency: 1, image: 'url' },
        { nickname: 'Acanthaceae', species: 'Acanthaceae', h2oFrequency: 4, image: 'url' },
        { nickname: 'nickname here', species: 'Cephalotaceae', h2oFrequency: 3, image: 'url' },
        { nickname: 'pretty plant', species: 'Saururaceae', h2oFrequency: 2, image: 'url' },
      ])
    })
}
