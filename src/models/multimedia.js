const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const multimediaSchema = new Schema(
    {
        descripcion: {type:String},
        url: {type:String},
        tipo: {type:String},
        formato: {type:String},
        tamano: {type:String},
        id_bucket: {type:String},
        usuario_creador_id: {type: String, ref: 'Usuario'},
        etiquetas_relacionadas_ids: [{type: String, ref:'Etiqueta'}],
        tableros_agregados_ids: [{type:String, ref:'Tablero'}]
    },
    {
        versionKey: false, 
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);


module.exports = mongoose.model('Multimedia', multimediaSchema);