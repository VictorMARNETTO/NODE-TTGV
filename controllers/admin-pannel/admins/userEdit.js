// DB COLLECTION USERS
const adminLayout = 'adminMain'

module.exports = (req, res) => {
   res.render('admin/admins/editAdmin', {layout: adminLayout})
}