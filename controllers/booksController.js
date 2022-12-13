'use strict'

const booksRepository = require('../repositories/book-repository')
const ctrlBase = require('../bin/base/controller-base')

const _repo = new booksRepository()

function booksController() {}

booksController.prototype.get = async (req, res) => {
    ctrlBase.get(_repo, req, res)
}

booksController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

module.exports = booksController
