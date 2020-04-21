'use strict'

const Etiqueta = require('../models/etiqueta')
const Multimedia = require('../models/multimedia')

async function getAllTagImages(req, res){

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
                id: multimediaTag._id,
                url: multimediaTag.url,
                descripcion: multimediaTag.descripcion,
                tipo: multimediaTag.tipo,
                formato: multimediaTag.formato,
                id_bucket: multimediaTag.id_bucket,
                usuario_creador_id: multimediaTag.usuario_creador_id,
                etiquetas_relacionada_ids: multimediaTag.etiquetas_relacionada_ids,
                tableros_agregado_ids: multimediaTag.tableros_agregado_ids,
                created_at: multimediaTag.created_at
            })
        }
        multimediaByTag.sort(GetSortOrder("created_at"))
        res.status(200).send({
            multimediaByTag
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
    getAllTagImages,
}