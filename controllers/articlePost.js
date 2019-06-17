const path = require('path')
const Post = require("../database/models/Article")

module.exports = (req, res) => {

    const {
        image
    } = req.files

    const uploadFile = path.resolve(__dirname, '..', 'public/articles', image.name);

    image.mv(uploadFile, (error) => {
        Post.create({
            ...req.body,
            image: `../articles/${image.name}`
        }, (error, post) => {
            res.redirect("/actus")
        })
    })
}



//    __________
//  / ___  ___ \
// / / @ \/ @ \ \
// \ \___/\___/ /\
// \____\/____/||
// /     /\\\\\//
// |     |\\\\\\
//  \      \\\\\\
//   \______/\\\\
//    _||_||_
//     -- --


//      ___               _   __   _        __                   __  ___     
//    / _ )  __ __      | | / /  (_) ____ / /_ ___   ____      /  |/  /     
//  / _  | / // /      | |/ /  / / / __// __// _ \ / __/      / /|_/ /      
// /____/  \_, /       |___/  /_/  \__/ \__/ \___//_/        /_/  /_/       
//        /___/                                                              