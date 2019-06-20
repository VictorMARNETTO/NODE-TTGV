const adminLayout = 'adminMain'
, Trombi = require('../../../database/models/licencieTrombi')

module.exports = async (req, res) => {
    // const trombi = await Trombi.find({})
    const trombiBureau = await Trombi.find({status: 'bureau'})
    , trombi1 = await Trombi.find({equipe: '1'})
    , trombi2 = await Trombi.find({equipe: '2'})
    , trombi3 = await Trombi.find({equipe: '3'})
    , trombi4 = await Trombi.find({equipe: '4'})

    res.render('admin/trombinoscope/trombiAdmin', { trombiBureau, trombi1, trombi2, trombi3, trombi4, layout: adminLayout})
}