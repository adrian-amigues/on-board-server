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
    imageUrl: ({ objectid }) => {
      return axios
        .get(
          `https://www.boardgamegeek.com/xmlapi2/thing?id=${objectid}&stats=1`
        )
        .then(result => parseStringPromise(result.data))
        .then(data => data.items.item[0].thumbnail[0])
        .catch(error => {
          console.log('error HotGame imageUrl: ', error)
        })
    },
    description: ({ objectid }) => {
      return axios
        .get(
          `https://www.boardgamegeek.com/xmlapi2/thing?id=${objectid}&stats=1`
        )
        .then(result => parseStringPromise(result.data))
        .then(data => data.items.item[0].description[0])
        .catch(error => {
          console.log('error HotGame description: ', error)
        })
    },
    // imageUrl: ({ objectid }) => {
    //   return axios
    //     .get(
    //       `https://api.geekdo.com/api/geekmarket/products?ajax=1&nosession=1&objectid=${objectid}&objecttype=thing`
    //     )
    //     .then(({ data }) => data.linkeditem.image.images.small.src)
    //     .catch(error => {
    //       console.log('error imageUrl: ', error)
    //     })
    // },
  },
}
