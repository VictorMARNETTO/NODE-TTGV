const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Le nom est obligatoire'],
    },
    surname: {
        type: String,
        required: [true, 'Le prénom est obligatoire'],
    },
    birthdate: {
        type: Date,
        required: [true, 'La date de naissance est obligatoire'],
    },
    email: {
        type: String,
        required: [true, `L'email est obligatoire`],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Un mot de passe est necessaire'],
    },

})

AdminSchema.pre('save', function (next) {

    const admin = this

    bcrypt.hash(admin.password, 10, (error, encrypted) => {

        admin.password = encrypted
        next()
    })

})

module.exports = mongoose.model('Admin', AdminSchema)


//    __________
//  / ___  ___ \
// / / @ \/ @ \ \
// \ \___/\___/ /\
// \____\/____/||
// /     /\\\\\//
// |     |\\\\\\
//  \      \\\\\\
//   \______/\\\\
//    _||_||_
//     -- --


//      ___               _   __   _        __                    __  ___     
//    / _ )  __ __      | | / /  (_) ____ / /_ ___   ____       /  |/  /     
//  / _  | / // /      | |/ /  / / / __// __// _ \ / __/      / /|_/ /      
// /____/  \_, /       |___/  /_/  \__/ \__/ \___//_/        /_/  /_/       
//        /___/                                                              