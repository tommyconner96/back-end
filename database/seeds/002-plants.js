
exports.seed = async function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        { user_id: 1, nickname: 'Blue Mouse Ears', species: 'Hosta', h2oFrequency: 2, image: 'url' },
        { user_id: 1, nickname: 'Cherry Vanilla', species: 'Dianthus', h2oFrequency: 4, image: 'url' },
        { user_id: 1, nickname: 'Valentine Bleeding Heart', species: 'Dicentra Spectabilis', h2oFrequency: 3, image: 'url' },
        { user_id: 2, nickname: 'English Lavender', species: 'Lobelia', h2oFrequency: 1, image: 'url' },
        { user_id: 2, nickname: 'Hen & Chicks', species: 'Sempervivum', h2oFrequency: 3, image: 'url' },
        { user_id: 3, nickname: 'Sugar Buzz "Bee Balm"', species: 'Mondara', h2oFrequency: 1, image: 'url' },

      ])
    })
}
