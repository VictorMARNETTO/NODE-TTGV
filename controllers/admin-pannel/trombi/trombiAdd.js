// DB COLLECTIONS TROMBI
const adminLayout = 'adminMain'

module.exports = (req, res) => {
    res.render('admin/trombinoscope/addTrombi', {layout: adminLayout})
}