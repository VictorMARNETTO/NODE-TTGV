// DB COLLECTION USERS
const Admin = require('../../../database/models/Admin');
const adminLayout = 'adminMain'

module.exports = async (req, res) => {

   const admin = await Admin.findById(req.params.id)

   res.render('admin/admins/editAdmin', { admin, layout: adminLayout })
};