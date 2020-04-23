'use strict'

const Usuario = require('../models/usuario')
const Multimedia = require('../models/multimedia')
const Etiqueta = require('../models/etiqueta')

async function getRelatedUsersByUser(req, res){

    let userId = req.params.userId

    let usuario = await Usuario.findById(userId, (err, usuario) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion'})
        if(!usuario) return res.status(404).send({message: `El usuario no existe` })
    })
    

    let allTags = []
    let relatedUsers = []

    if(usuario){
        let multimedia = await Multimedia.find({usuario_creador_id: userId}).exec();
        for(let i=0; i < multimedia.length; i++){
            allTags = allTags.concat(multimedia[i].etiquetas_relacionada_ids)
        }
        allTags =  [...new Set(allTags)]


        for(let j=0; j < allTags.length; j++){
            let etiqueta = await Etiqueta.findById(allTags[j]).exec()
            let multimediaId = etiqueta.multimedia_relacionada_ids
            for(let k=0; k < multimediaId.length; k++){
                let multimediaTag = await Multimedia.findById(multimediaId[k]).exec()
                relatedUsers.push(multimediaTag.usuario_creador_id)
            }
        }
        relatedUsers =  [...new Set(relatedUsers)]
        removeItemFromArr(relatedUsers, userId)
        res.status(200).send({
            relatedUsers: relatedUsers,
            allUserTags: allTags
        })
    }
}

async function getRelatedTagsByTag(req, res){
    let tagId = req.params.tagId

    let etiqueta = await Etiqueta.findById(tagId, (err, etiqueta) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion'})
        if(!etiqueta) return res.status(404).send({message: `La etiqueta no existe` })
    })

    let relatedTags = []
    let relatedTagUsers = []

    if(etiqueta){
        let multimediaId = etiqueta.multimedia_relacionada_ids
        for(let i=0; i < multimediaId.length; i++){
            let multimediaTag = await Multimedia.findById(multimediaId[i]).exec();
            relatedTags = relatedTags.concat(multimediaTag.etiquetas_relacionada_ids) 
            relatedTagUsers = relatedTagUsers.concat(multimediaTag.usuario_creador_id)
        }
        relatedTags =  [...new Set(relatedTags)]
        relatedTagUsers =  [...new Set(relatedTagUsers)]
        removeItemFromArr(relatedTags, tagId)
        res.status(200).send({
            relatedTags,
            relatedTagUsers
        })
    }
}

var removeItemFromArr = ( arr, item ) => {
    var i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );
};

module.exports = {
    getRelatedUsersByUser,
    getRelatedTagsByTag
}