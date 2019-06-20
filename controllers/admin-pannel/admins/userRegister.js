const Admin = require('../../../database/models/Admin')

module.exports = (req, res) => {
    Admin.create(
        req.body, (error, admin) => {

            if (error) {

                // const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

                // req.flash('registerError', registerError)
                // req.flash('data', req.body)
                console.log(error);
                
                return res.redirect("/admin-pannel/admins/create")
            }
            res.redirect('/admin-pannel')
        }
    )
}


//   __________
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