'use strict'

const express = require('express')
const api = express.Router()


const Usuario= require('../models/usuario');
const Etiqueta = require('../models/etiqueta');
const Multimedia = require('../models/multimedia');
// const Tablero = require('../models/tablero');
//Rutas Asociadas a Multimedia
//get para obtener una imagen y su informacion -> solamente recibe el id



//Rutas Asociadas a Usuarios
//Get para todas las imagenes asociadas a un usuarios -> recibe el id de usuario




//Rutas Asociadas a Etiquetas
//Get para todas las imagenes asociadas a una etiqueta -> recibe el id de la etiqueta




//Rutas Asociadas a Tablero
//Get para todas las imagenes asociadas a un tablero -> recibe el id del tablero




//Rutas Asociadas a Feed
//Feed de todos los usuarios seguidos -> Recibe el id del usuario y todos los usuarios que sigue
//Feed de todos las etiquetas seguidas -> Recibe el id del usuario y todos las etiquetas que sigue



//Otras rutas 

//Aqui suele ir toda la info de la api
api.get('/user', (req, res) => {
   
})





module.exports = api