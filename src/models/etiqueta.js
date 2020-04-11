const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const etiquetaSchema = new Schema(
    {
        _id:{type: String},
        multimedia_relacionada_ids: [{type: mongoose.Schema.Types.ObjectId, ref:'Multimedia'}]
    },
    {
        versionKey: false, 
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);



module.exports = mongoose.model('Etiqueta', etiquetaSchema);