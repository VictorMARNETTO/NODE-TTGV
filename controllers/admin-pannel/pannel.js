// DB COLLECTION ADMIN
const adminLayout = 'adminMain';
const Admin = require('../../database/models/Admin')

module.exports = async (req, res) => {

    const admin = await Admin.find({})

    res.render('admin/pannel', { admin, layout:adminLayout})
}