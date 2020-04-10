const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tableroSchema = new Schema(
    {
        _id:{type: mongoose.Schema.Types.ObjectId},
        multimedia_agregada: [{type: mongoose.Schema.Types.ObjectId, ref:'Multimedia'}]
    }
);



module.exports = mongoose.model('Tablero', tableroSchema);