const Admin = require('../../../database/models/Admin')

module.exports =  async (req, res) => {

       const adminId = await Admin.findById(req.params.id)

       Admin.findByIdAndRemove(adminId, function (err) {
           if (err)
               throw err;
       })
           console.log(Admin);

       res.redirect('/admin-pannel')

}
