'use strict'

const Usuario = require('../models/usuario')
const Multimedia = require('../models/multimedia')

const signUp = (req, res) => {
    const usuario = new Usuario()
    usuario._id = req.body._id
    usuario.save((err, usuarioStored) => {
        if (err) return res.status(500).send({ msg: `Error al crear usuario: ${err}` })
        return res.status(200).send({usuario: usuarioStored})
    })
}

async function getAllUserImages(req, res){

    let userId = req.params.userId

    Usuario.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion'})
        if(!user) {
            return res.status(404).send({message: `El usuario no existe` })
        }else{
            Multimedia.find({usuario_creador_id: userId}, (err, user) => {
                if (err) return res.status(500).send({message: 'Error al realizar la peticion'})
                if (!user) return res.status(404).send({message: `El usuario no tiene multimedia`})
        
                res.status(200).send(user);
            })
        }
    })
}

module.exports = {
    signUp,
    getAllUserImages,
}