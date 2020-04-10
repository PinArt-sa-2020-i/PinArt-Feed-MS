const mongoose = require('mongoose')
const Schema = mongoose.Schema


const usuarioSchema = new Schema(
    {
        _id: {type: mongoose.Schema.Types.ObjectId},
        multimedia_creada: {type: mongoose.Schema.Types.ObjectId, ref:'Multimedia'}
    }
);



module.exports = mongoose.model('Usuario', usuarioSchema);