const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const multimediaSchema = new Schema(
    {
        descripcion: {type:String},
        url: {type:String},
        tipo: {type:String},
        formato: {type:String},
        tamano: {type:String},
        usuario_creador: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
        etiquetas_relacionadas: [{type:mongoose.Schema.Types.ObjectId, ref:'Etiqueta'}],
        tableros_agregados: [{type:mongoose.Schema.Types.ObjectId, ref:'Tablero'}]
    }
);


module.exports = mongoose.model('Multimedia', multimediaSchema);