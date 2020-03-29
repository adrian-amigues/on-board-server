const { ApolloServer } = require('apollo-server')

const typeDefs = require('./typeDefs/index')
const resolvers = require('./resolvers/index')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: {
    apiKey: 'service:on-board:W4UPaXIItxHVoqwqQnC7cA',
  },
  tracing: true,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
