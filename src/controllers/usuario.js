'use strict'

const Usuario = require('../models/usuario')
const Multimedia = require('../models/multimedia')


async function getAllUserImages(req, res){

    let userId = req.params.userId
    let userMultimedia = []

    Usuario.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion'})
        Multimedia.find({usuario_creador_id: userId}).sort("-created_at").exec((err, multimedia) => {
            if (err) return res.status(500).send({message: 'Error al realizar la peticion'})
            for(let j=0; j < multimedia.length; j++){
                userMultimedia.push({
                    url: multimedia[j].url,
                    descripcion: multimedia[j].descripcion,
                    tipo: multimedia[j].tipo,
                    formato: multimedia[j].formato,
                    id_bucket: multimedia[j].id_bucket,
                    usuario_creador_id: multimedia[j].usuario_creador_id,
                    etiquetas_relacionadas_ids: multimedia[j].etiquetas_relacionadas_ids,
                    tableros_agregados_ids: multimedia[j].tableros_agregados_ids,
                    id: multimedia[j]._id,
                    created_at: multimedia[j].created_at
                })
            }
            
            res.status(200).send(userMultimedia);
        })
    })
}

module.exports = {
    getAllUserImages,
}