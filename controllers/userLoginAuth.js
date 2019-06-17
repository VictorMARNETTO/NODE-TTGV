const bcrypt = require('bcrypt')
const User = require('../database/models/User')

module.exports = (req, res) => {

    const {email, password} = req.body;
    
    User.findOne({email}, (error, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    console.log("OK");
                    

                    req.session.userId = user._id
                    
                    res.redirect('/')
                }
                else {
                    console.log("Pas OK");
                    
                    res.redirect('/user/login')
                }
            })
        } else {
            console.log("NUL2");
            

            return res.redirect('/user/login')
        }
    })
}


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