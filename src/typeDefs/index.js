const { gql } = require('apollo-server')

module.exports = gql`
  type HotGame {
    id: ID!
    bggHref: String
    yearPublished: Int
    thumbnailUrl: String
    name: String
    imageUrl: String
    rank: Int
    description: String
    minPlayers: Int
    maxPlayers: Int
  }

  type SimilarGame {
    id: ID!
    bggHref: String
    name: String
    imageUrl: String
    rank: Int
    rating: Float
    weight: Float
  }

  type Query {
    hotGames: [HotGame]
    similarGames(id: ID!): [SimilarGame]
  }
`
