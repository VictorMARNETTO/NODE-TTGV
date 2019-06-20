// DB COLLECTIONS USERS findOneAndUpdate

const Admin = require('../../../database/models/Admin');
// const path = require('path')

module.exports = (req,res) => {
    let query = { id: req.body.adminId }
        Admin.findOneAndUpdate(query, { ...req.body}, function (error, post) {
            if (error) {
                console.log("ERREUR", error);
                return;
            } else {
                console.log("C'est OK");
                res.redirect('/admin-pannel');
            }
        });
}    
