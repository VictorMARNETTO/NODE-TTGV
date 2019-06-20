const User = require('../database/models/Admin')

module.exports = (req, res, next) => {

        if(req.session.userId) {
            return res.redirect('/admin-pannel')
        }

        next()
}