'use strict'

const Multimedia = require('../models/multimedia')

function getMultimedia(req, res){
    let multimediaId = req.params.multimediaId

    Multimedia.findById(multimediaId, (err, multimedia) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion '})
        if(!multimedia) return res.status(404).send({message: `El producto no existe ${multimediaId}` })

        res.status(200).send({
            url: multimedia.url,
            descripcion: multimedia.descripcion,
            tipo: multimedia.tipo,
            formato: multimedia.formato,
            usuario_creador_id: multimedia.usuario_creador_id,
            etiquetas_relacionadas_ids: multimedia.etiquetas_relacionadas_ids,
            tableros_agregados_ids: multimedia.tableros_agregados_ids,
        })
    })
}

const createMultimedia = (req, res) => {
    let multimedia = new Multimedia()
    multimedia.descripcion = req.body.descripcion
    multimedia.url = req.body.url
    multimedia.tipo = req.body.tipo
    multimedia.formato = req.body.formato
    multimedia.tamano = req.body.tamano
    multimedia.usuario_creador_id = req.body.usuario_creador_id
    multimedia.etiquetas_relacionadas_ids = req.body.etiquetas_relacionadas_ids
    multimedia.tableros_agregados_ids = req.body.tableros_agregados_ids

    multimedia.save((err, multimediaStored) => {
        if (err) return res.status(500).send({ msg: `Error al crear multimedia: ${err}` })
        return res.status(200).send({multimedia: multimediaStored})
    })
}

module.exports = {
    getMultimedia,
    createMultimedia,
}