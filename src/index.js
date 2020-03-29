const { ApolloServer } = require('apollo-server')

const typeDefs = require('./typeDefs/index')
const resolvers = require('./resolvers/index')
const xmlAPI2 = require('./dataSources/xmlapi2')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    xmlAPI2: new xmlAPI2(),
  }),
  engine: {
    apiKey: 'service:on-board:W4UPaXIItxHVoqwqQnC7cA',
  },
  tracing: true,
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
