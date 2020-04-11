'use strict'

const express = require('express')
const api = express.Router()
const multimediaCtrl = require('../controllers/multimedia')
const usuarioCtrl = require('../controllers/usuario')
const tagCtrl = require('../controllers/etiqueta')
const tableCtrl = require('../controllers/tablero')
const feedCtrl = require('../controllers/feed')



 //Rutas Asociadas a Multimedia

//get para obtener una imagen y su informacion -> solamente recibe el id

api.get('/getMultimediaInformation/:multimediaId', multimediaCtrl.getMultimedia)



//Rutas Asociadas a Usuarios

//Get para todas las imagenes asociadas a un usuarios -> recibe el id de usuario

api.get('/getMultimediaByUser/:userId', usuarioCtrl.getAllUserImages)


//Rutas Asociadas a Etiquetas
//Get para todas las imagenes asociadas a una etiqueta -> recibe el id de la etiqueta

api.get('/getMultimediaByTag/:tagId', tagCtrl.getAllTagImages)


//Rutas Asociadas a Tablero
//Get para todas las imagenes asociadas a un tablero -> recibe el id del tablero

api.get('/getMultimediaByTable/:tableId', tableCtrl.getAllTableImages)


//Rutas Asociadas a Feed
//Feed de todos los usuarios seguidos -> Recibe el id del usuario y todos los usuarios que sigue
api.post('/getUsersFeed', feedCtrl.getUsersFeed)
//Feed de todos las etiquetas seguidas -> Recibe el id del usuario y todos las etiquetas que sigue
api.post('/getTagsFeed', feedCtrl.getTagsFeed)


//Rutas auxiliares 

//Aqui suele ir toda la info de la api
api.get('/user', (req, res) => {

})





module.exports = api