module.exports = (req, res, next) => {
    if(!req.files) {
        return res.redirect('/admin-pannel/trombi/add')
    }
    next()
}