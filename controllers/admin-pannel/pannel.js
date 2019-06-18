// DB COLLECTION ADMIN
const adminLayout = 'adminMain';

module.exports = (req, res) => {
    res.render('admin/pannel', {layout:adminLayout})
}