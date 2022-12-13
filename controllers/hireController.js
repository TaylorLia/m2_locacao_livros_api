'use strict'

const hireRepository = require('../repositories/hire-repository')
const ctrlBase = require('../bin/base/controller-base')
const validators = require('../bin/lib/validators')
const jwt = require('jsonwebtoken')
const md5 = require('md5')
const config = require('../config')

const _repo = new hireRepository()

function hireController() {}

hireController.prototype.post = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.usuario, 'Informe o id do usuário')
  _validator.isRequired(req.body.dias, 'Informe o tempo de locação do livro')
  _validator.isRequired(req.body.livro, 'Informe o nome do livro')

  ctrlBase.post(_repo, _validator, req, res)
}

hireController.prototype.put = async (req, res) => {
  let _validator = new validators()

  _validator.isRequired(req.body.dias, 'Informe o tempo de locação do livro')

  ctrlBase.put(_repo, _validator, req, res)
}

hireController.prototype.get = async (req, res) => {
  ctrlBase.get(_repo, req, res)
}

hireController.prototype.getById = async (req, res) => {
  ctrlBase.getById(_repo, req, res)
}

hireController.prototype.delete = async (req, res) => {
  ctrlBase.delete(_repo, req, res)
}

hireController.prototype.authenticate = async (req, res) => {
    let _validator = new validators()
  
    _validator.isRequired(req.body.email, 'Informe o seu email')
    _validator.isEmail(req.body.email, 'O email informado é inválido')
    _validator.isRequired(req.body.password, 'Informe a sua senha')
  
    if (!_validator.isValid()) {
      res.status(400).send({
        message: 'Não foi possível efetuar o Login!',
        validation: _validator.errors()
      })
    }
  
    let user = await _repo.authenticate(req.body.email, req.body.password)
    if (user) {
      res.status(200).send({
          user: user,
          token: jwt.sign(
              {
              user: user
              },
              config.secretKey
          )
      })
    } else {
      res.status(404).send({
        message: 'Usuário e senha inválidos!'
      })
    }
}

module.exports = hireController
