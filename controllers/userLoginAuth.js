const bcrypt = require('bcrypt')
const Admin = require('../database/models/Admin')

module.exports = (req, res) => {

    const {email, password} = req.body;
    
    Admin.findOne({email}, (error, admin) => {
        if (admin) {
            bcrypt.compare(password, admin.password, (error, same) => {
                if (same) {
                    console.log("OK");
                    

                    req.session.adminId = admin._id
                    
                    res.redirect('/admin-pannel')
                }
                else {
                    console.log("Pas OK");
                    
                    res.redirect('/admin/login')
                }
            })
        } else {
            console.log("NUL2");
            

            return res.redirect('/admin/login')
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