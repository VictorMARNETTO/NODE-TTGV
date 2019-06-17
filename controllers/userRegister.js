const User = require('../database/models/User')

module.exports = (req, res) => {
    User.create(
        req.body, (error, user) => {

            if (error) {

                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

                req.flash('registerError', registerError)
                req.flash('data', req.body)

                return res.redirect("/user/create")
            }
            res.redirect('/')
        }
    )
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