'use strict'


const Tablero = require('../models/tablero')
const Multimedia = require('../models/multimedia')

const createTable = (req, res) => {
    const tablero = new Tablero()
    tablero._id = req.body._id
    tablero.multimedia_agregada_ids = req.body.multimedia_agregada_ids
    tablero.save((err, tableroStored) => {
        if (err) return res.status(500).send({ msg: `Error al crear el tablero: ${err}` })
        return res.status(200).send({tablero: tableroStored})
    })
}

async function getAllTableImages(req, res){

    let tagId = req.params.tagId

    let etiqueta = await Etiqueta.findById(tagId, (err, etiqueta) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion'})
        if(!etiqueta) return res.status(404).send({message: `La etiqueta no existe` })
    })
    
    let multimediaByTag = []

    if(etiqueta){
        let multimediaId = etiqueta.multimedia_relacionada_ids
        for(let i=0; i < multimediaId.length; i++){
            let multimediaTag = await Multimedia.findById(multimediaId[i]).exec();
            multimediaByTag.push({
                url: multimediaTag.url,
                descripcion: multimediaTag.descripcion,
                tipo: multimediaTag.tipo,
                formato: multimediaTag.formato,
                usuario_creador_id: multimediaTag.usuario_creador_id,
                etiquetas_relacionadas_ids: multimediaTag.etiquetas_relacionadas_ids,
                tableros_agregados_ids: multimediaTag.tableros_agregados_ids,
            })
        }
        res.status(200).send({
            multimediaByTag
        })
    }
    
}



module.exports = {
    createTable,
    getAllTableImages,
}