'use strict'

const express = require('express')
const api = express.Router()

api.get('/', (req, res) => {
    res.send({message: "Buenas"})
})

module.exports = api