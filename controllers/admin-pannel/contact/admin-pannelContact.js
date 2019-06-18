// DB COLLECTIONS CONTACT TEXT
const adminLayout = 'adminMain';

module.exports = (req, res) => {
    res.render('admin/contactEdit', {layout: adminLayout})
}