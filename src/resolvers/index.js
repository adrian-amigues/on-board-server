const axios = require('axios')
const parseStringPromise = require('xml2js').parseStringPromise

module.exports = {
  Query: {
    hotGames: () => {
      return axios
        .get(
          'https://api.geekdo.com/api/hotness?geeksite=boardgame&nosession=1&objecttype=thing&showcount=30'
        )
        .then(({ data }) => data.items.splice(0, 5))
        .catch(error => {
          console.log('error hotGames: ', error)
        })
    },
  },
  HotGame: {
    id: parent => parent.objectid,
    name: parent => parent.name,
    thumbnailUrl: parent => parent.squareimageurl,
    imageUrl: ({ objectid }, _, { dataSources }) => {
      return dataSources.xmlAPI2
        .getGame(objectid)
        .then(result => result.thumbnail[0])
    },
    description: ({ objectid }, _, { dataSources }) => {
      return dataSources.xmlAPI2
        .getGame(objectid)
        .then(result => result.description[0])
    },
  },
}
