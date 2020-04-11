const mongoose = require('mongoose')
const Schema = mongoose.Schema


const usuarioSchema = new Schema(
    {
        _id: {type: String},
    },
    {
        versionKey: false, 
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);



module.exports = mongoose.model('Usuario', usuarioSchema);