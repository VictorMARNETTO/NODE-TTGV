const Admin = require('../database/models/Admin')

module.exports = (req, res, next) => {

    // Connecte toi dans la Database

    Admin.findById(req.session.adminId, (error, admin) => {
        if (error || !admin) {
            return res.redirect('/admin/login')
        }
        next()
    })

    // Verifie l'user

    // Si il est dans la Database 

    // Sinon tu de redirige
}