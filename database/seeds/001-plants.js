
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
        { nickname: 'Blue Mouse Ears', species: 'Hosta', h2oFrequency: 2, image: 'url' },
        { nickname: 'Cherry Vanilla', species: 'Dianthus', h2oFrequency: 4, image: 'url' },
        { nickname: 'Valentine Bleeding Heart', species: 'Dicentra Spectabilis', h2oFrequency: 3, image: 'url' },
        { nickname: 'English Lavender', species: 'Lobelia', h2oFrequency: 1, image: 'url' },
        { nickname: 'Hen & Chicks', species: 'Sempervivum', h2oFrequency: 3, image: 'url' },
        { nickname: 'Sugar Buzz "Bee Balm"', species: 'Mondara', h2oFrequency: 1, image: 'url' },
      ])
    })
}
