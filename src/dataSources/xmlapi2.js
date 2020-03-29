const { RESTDataSource } = require('apollo-datasource-rest')
const parseStringPromise = require('xml2js').parseStringPromise

module.exports = class xmlAPI2 extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://www.boardgamegeek.com/xmlapi2/'
  }

  getGame(id) {
    return this.get(`thing?id=${id}`)
      .then(result => parseStringPromise(result))
      .then(data => data.items.item[0])
      .catch(error => {
        console.log('error getImageUrl: ', error)
      })
  }
}
