'use strict'

const Usuario = require('../models/usuario')
const Etiqueta = require('../models/etiqueta')
const Multimedia = require('../models/multimedia')


async function getUsersFeed(req, res){

    let followedUsers = req.body.followedUsers
    let userFeed = []

    for(let i=0; i < followedUsers.length; i++){
        let multimediaFeed = await Multimedia.find({usuario_creador_id: followedUsers[i]}).exec();
        for(let j=0; j < multimediaFeed.length; j++){
            userFeed.push({
                url: multimediaFeed[j].url,
                descripcion: multimediaFeed[j].descripcion,
                tipo: multimediaFeed[j].tipo,
                formato: multimediaFeed[j].formato,
                id_bucket: multimediaFeed[j].id_bucket,
                usuario_creador_id: multimediaFeed[j].usuario_creador_id,
                etiquetas_relacionada_ids: multimediaFeed[j].etiquetas_relacionada_ids,
                tableros_agregado_ids: multimediaFeed[j].tableros_agregado_ids,
                id: multimediaFeed[j]._id,
                created_at: multimediaFeed[j].created_at
            })
        }
    }

    userFeed.sort(GetSortOrder("created_at"))

    res.status(200).send({
        userFeed
    })
}

async function getTagsFeed(req, res){

    let followedTags = req.body.followedTags
    let tagFeed = []

    for(let i=0; i < followedTags.length; i++){
        let multimediaFeed = await Multimedia.find({etiquetas_relacionada_ids: followedTags[i]}).exec();
        for(let j=0; j < multimediaFeed.length; j++){
            tagFeed.push({
                url: multimediaFeed[j].url,
                descripcion: multimediaFeed[j].descripcion,
                tipo: multimediaFeed[j].tipo,
                formato: multimediaFeed[j].formato,
                id_bucket: multimediaFeed[j].id_bucket,
                usuario_creador_id: multimediaFeed[j].usuario_creador_id,
                etiquetas_relacionada_ids: multimediaFeed[j].etiquetas_relacionada_ids,
                tableros_agregado_ids: multimediaFeed[j].tableros_agregado_ids,
                id: multimediaFeed[j]._id,
                created_at: multimediaFeed[j].created_at
            })
        }
        
    }   
    
    var seenNames = {};
    tagFeed = tagFeed.filter(function(currentObject) {
        if (currentObject.id in seenNames) {
            return false;
        } else {
            seenNames[currentObject.id] = true;
            return true;
        }
    });


    tagFeed.sort(GetSortOrder("created_at"))

    res.status(200).send({
        tagFeed
    })
}

function GetSortOrder(prop) {  
    return function(a, b) {  
        if (a[prop] < b[prop]) {  
            return 1;  
        } else if (a[prop] > b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}  

module.exports = {
    getUsersFeed,
    getTagsFeed,
}