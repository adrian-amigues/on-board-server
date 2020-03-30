const axios = require('axios')

module.exports = {
  Query: {
    hotGames: () => {
      return axios
        .get(
          'https://api.geekdo.com/api/hotness?geeksite=boardgame&nosession=1&objecttype=thing&showcount=30'
        )
        .then(({ data }) => data.items.splice(0, 10))
        .catch(error => {
          console.log('error hotGames: ', error)
        })
    },
    similarGames: (_, args) => {
      return axios
        .get(
          `https://api.geekdo.com/api/geekitem/recs?ajax=1&objectid=${args.id}&objecttype=thing&pageid=1`
        )
        .then(({ data }) => {
          return data.recs.map(rec => ({ ...rec.item.item }))
        })
        .catch(error => {
          console.log('error similarGames: ', error)
        })
    },
  },
  HotGame: {
    id: parent => parent.objectid,
    bggHref: parent => `https://boardgamegeek.com${parent.href}`,
    yearPublished: parent => parent.yearpublished,
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
    minPlayers: ({ objectid }, _, { dataSources }) => {
      return dataSources.xmlAPI2
        .getGame(objectid)
        .then(result => result.minplayers[0].$.value)
    },
    maxPlayers: ({ objectid }, _, { dataSources }) => {
      return dataSources.xmlAPI2
        .getGame(objectid)
        .then(result => result.maxplayers[0].$.value)
    },
  },
  SimilarGame: {
    id: parent => parent.primaryname.nameid,
    bggHref: parent => `https://boardgamegeek.com${parent.href}`,
    name: parent => parent.primaryname.name,
    imageUrl: parent => parent.images.previewthumb,
    rank: parent => parent.dynamicinfo.item.rankinfo[0].rank,
    rating: parent => parent.dynamicinfo.item.rankinfo[0].baverage,
    weight: parent => parent.dynamicinfo.item.stats.avgweight,
  },
}
