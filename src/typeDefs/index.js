const { gql } = require('apollo-server')

module.exports = gql`
  type HotGame {
    id: ID
    name: String
    thumbnailUrl: String
    imageUrl: String
    rank: Int
    yearpublished: Int
    description: String
  }

  type Query {
    hotGames: [HotGame]
  }
`
