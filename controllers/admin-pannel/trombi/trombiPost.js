// DB COLLECTION TROMBI ADDONE

const path = require('path')
const Post = require('../../../database/models/licencieTrombi')

module.exports = (req, res) => {

    const {
        image
    } = req.files
    const uploadFile = path.resolve(__dirname, '..', '..', '..', 'public/ressources/pictures/trombi', image.name);
    image.mv(uploadFile, (error) => {
        Post.create({
            ...req.body,
            image: `/ressources/pictures/trombi/${image.name}`
        }, (error, post) => {
            console.log("YEAH BOYYYY");
            console.log(req.body);
            res.redirect("/admin-pannel/trombi")
        })
    })
}
