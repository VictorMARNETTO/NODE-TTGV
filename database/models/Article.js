const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({

    title: String,
    content: String,
    author: String,
    image: {
        type: String,
        required: false,
    },
    date: String,
    createDate:  {
        type: Date,
        default: new Date()
    }

})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article


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


//      ___               _   __   _        __                    __  ___     
//    / _ )  __ __      | | / /  (_) ____ / /_ ___   ____       /  |/  /     
//  / _  | / // /      | |/ /  / / / __// __// _ \ / __/      / /|_/ /      
// /____/  \_, /       |___/  /_/  \__/ \__/ \___//_/        /_/  /_/       
//        /___/                                                              