const { gql } = require('apollo-server')

module.exports = gql`
  type Query {
    searchGame(name: String!): SearchGameResult
    hotGames: [HotGame]
    similarGames(id: ID!): [SimilarGame]
  }

  type SearchGameResult {
    id: ID!
    name: String
    bggHref: String
    yearPublished: Int
  }

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
`
