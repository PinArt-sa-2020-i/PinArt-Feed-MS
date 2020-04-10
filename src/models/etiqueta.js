const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const etiquetaSchema = new Schema(
    {
        _id:{type: mongoose.Schema.Types.ObjectId},
        multimedia_relacionada = [{type: mongoose.Schema.Types.ObjectId, ref: 'Multimedia'}]
    }
);



module.exports = mongoose.model('Etiqueta', etiquetaSchema);