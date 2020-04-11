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

    let tableId = req.params.tableId

    let tablero = await Tablero.findById(tableId, (err, tablero) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion'})
        if(!tablero) return res.status(404).send({message: `El tablero no existe` })
    })
    
    let multimediaByTable = []

    if(tablero){
        let tableId = tablero.multimedia_agregada_ids
        for(let i=0; i < tableId.length; i++){
            let multimediaTable = await Multimedia.findById(tableId[i]).exec();
            multimediaByTable.push({
                url: multimediaTable.url,
                descripcion: multimediaTable.descripcion,
                tipo: multimediaTable.tipo,
                formato: multimediaTable.formato,
                usuario_creador_id: multimediaTable.usuario_creador_id,
                etiquetas_relacionadas_ids: multimediaTable.etiquetas_relacionadas_ids,
                tableros_agregados_ids: multimediaTable.tableros_agregados_ids,
            })
        }
        res.status(200).send({
            multimediaByTable
        })
    }
    
}



module.exports = {
    createTable,
    getAllTableImages,
}