const adminLayout = 'adminMain'

module.exports = (req, res) => {
    res.render('admin/actus/actusAdmin', {layout: adminLayout})
}