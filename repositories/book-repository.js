// Definindo os 'imports'
const repBase = require('../bin/base/repository-base')

class bookRepository {
  constructor() {
    this._repBase = new repBase('book', 'books')
  }

  async getAll() {
    return await this._repBase.getAll()
  }

  async getById(id) {
    var allbooks = await this._repBase.getAll();
    var response = [];
    allbooks.forEach(element => {
        if(element.categoria == id) {
            response.push(element);
        }
    });
    return await response;
  }

}

module.exports = bookRepository
