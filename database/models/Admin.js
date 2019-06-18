const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Votre nom est obligatoire'],
    },
    email: {
        type: String,
        required: [true, 'Votre email est obligatoire'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Un mot de passe est necessaire'],
    },

})

UserSchema.pre('save', function (next) {

    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted) => {

        user.password = encrypted
        next()
    })

})

module.exports = mongoose.model('User', UserSchema)


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