'use strict'


const Tablero = require('../models/tablero')
const Multimedia = require('../models/multimedia')


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
                id: multimediaTable.id,
                url: multimediaTable.url,
                descripcion: multimediaTable.descripcion,
                tipo: multimediaTable.tipo,
                formato: multimediaTable.formato,
                id_bucket: multimediaTable.id_bucket,
                usuario_creador_id: multimediaTable.usuario_creador_id,
                etiquetas_relacionada_ids: multimediaTable.etiquetas_relacionada_ids,
                tableros_agregado_ids: multimediaTable.tableros_agregado_ids,
                created_at: multimediaTable.created_at
            })
        }
        multimediaByTable.sort(GetSortOrder("created_at"))
        res.status(200).send({
            multimediaByTable
        })
    }
    
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
    getAllTableImages,
}