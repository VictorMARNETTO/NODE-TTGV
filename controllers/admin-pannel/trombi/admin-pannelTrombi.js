const adminLayout = 'adminMain';

module.exports =  (req, res) => {
    res.render('admin/trombinoscope/trombiAdmin', {layout: adminLayout})
}