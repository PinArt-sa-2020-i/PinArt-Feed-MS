'use strict'

const Usuario = require('../models/usuario')
const Etiqueta = require('../models/etiqueta')
const Multimedia = require('../models/multimedia')


async function getUsersFeed(req, res){

    let userId = req.body.userId
    let followedUsers = req.body.followedUsers

    let usuario = await Usuario.findById(userId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion'})
        if(!usuario) return res.status(404).send({message: `El usuario no existe` })
    })

    let userFeed = []

    if(usuario){
        for(let i=0; i < followedUsers.length; i++){
            let multimediaFeed = await Multimedia.find({usuario_creador_id: followedUsers[i]}).exec();
            userFeed = userFeed.concat(multimediaFeed)
        }
        res.status(200).send({
            userFeed
        })
    } 
}

async function getTagsFeed(req, res){

    let userId = req.body.userId
    let followedTags = req.body.followedTags

    let usuario = await Usuario.findById(userId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion'})
        if(!usuario) return res.status(404).send({message: `El usuario no existe` })
    })

    let tagFeed = []

    if(usuario){
        for(let i=0; i < followedTags.length; i++){
            let multimediaFeed = await Multimedia.find({etiquetas_relacionadas_ids: followedTags[i]}).exec();
            tagFeed = tagFeed.concat(multimediaFeed)
        }   
        
        var seenNames = {};
        tagFeed = tagFeed.filter(function(currentObject) {
            if (currentObject._id in seenNames) {
                return false;
            } else {
                seenNames[currentObject._id] = true;
                return true;
            }
        });

        res.status(200).send({
            tagFeed
        })
    }
}

module.exports = {
    getUsersFeed,
    getTagsFeed,
}