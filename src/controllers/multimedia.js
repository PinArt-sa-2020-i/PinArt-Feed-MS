'use strict'

const Multimedia = require('../models/multimedia')
const Usuario = require('../models/usuario')

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
            id_bucket: multimedia.id_bucket,
            usuario_creador_id: multimedia.usuario_creador_id,
            etiquetas_relacionadas_ids: multimedia.etiquetas_relacionadas_ids,
            tableros_agregados_ids: multimedia.tableros_agregados_ids,
        })
    })
}

module.exports = {
    getMultimedia,
}