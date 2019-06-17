// CONTACT CONST
const mailSender = 'marnetto.cloud@gmail.com';
const mailReceiver = 'vic.marnetto@gmail.com';
const mailPassword = require('./config/passmail').MAILPASSWORD;

// Const
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const nodemailer = require('nodemailer')
const { stripTags } = require('./helpers/hbs');
// Controller //

// article0
const articleSingleController = require('./controllers/articleSingle');
const createArticleController = require('./controllers/articleAdd');
const articlePostController = require('./controllers/articlePost');
const articleEditGetController = require('./controllers/articleEditGet');
const articleDeleteController = require('./controllers/articleDelete');
const homepage = require('./controllers/homePage');
const index = require('./controllers/index');
// user
const userCreate = require('./controllers/userCreate');
const userRegister = require('./controllers/userRegister');
const userLogin = require('./controllers/userLogin');
const userLoginAuth = require('./controllers/userLoginAuth');
const userLogout = require('./controllers/userLogout.js');


const app = express();

// MongoDB
const db = require('./config/keys.js').MongoURI;
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connecter à MongoCloud"))
    .catch(err => console.log(err))
const mongoStore = MongoStore(expressSession)


app.use(connectFlash())
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
        { mongooseConnection: mongoose.connection }
    )

}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// FileUpload
app.use(fileupload())

const auth = require('./middleware/auth')
const redirectAuthSuccess = require('./middleware/redirectAuthSuccess')


var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

app.use(express.static('public'));

// Route
app.engine('handlebars', exphbs({
    helpers: {
        stripTags: stripTags
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})

// Middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)
// app.use("articles/add", auth)
app.get("/", index)
app.get("/actus", homepage)

// Articles       
app.get("/articles/add", auth, createArticleController)
app.get("/actus/:id", articleSingleController)
app.post("/articles/post", auth, articleValidPost, articlePostController)
app.get("/articles/delete/:id", auth, articleDeleteController)
app.get("/articles-edit/:id", auth, articleEditGetController)
app.post("/articles/edit/:id", function (req, res) {
    const Article = require('./database/models/Article');
    const path = require('path')
    let query = { id: req.body.articleId }
    const { image } = req.files
    const uploadFile = path.resolve(__dirname, '..', 'public/articles', image.name);

    image.mv(uploadFile, (error) => {
        Article.findOneAndUpdate(query, { ...req.body, image: `/articles/${image.name}` }, function (error, post) {
            if (error) {
                console.log(error);
                return;
            } else {
                console.log("C'est OK");
                res.redirect('/actus');
            }
        });
    })
});

// Users
app.get('/user/create', redirectAuthSuccess, userCreate)
app.post('/user/register', redirectAuthSuccess, userRegister)
app.get('/user/login', redirectAuthSuccess, userLogin)
app.post('/user/loginAuth', redirectAuthSuccess, userLoginAuth)
app.get('/user/logout', userLogout)

// Contact
app.post('/send-message', (req, res) => {
    const output = `
        <h1>Nouvelle requète de contact</h1>
        <h3>Détails:</h3>
        <ul>
            <li>Nom: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Liens au Club: ${req.body.liens}</li>
        </ul>
        <h3>Message: </h3>
        <p>${req.body.message}</p>
        `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'marnetto.cloud@gmail.com', // generated ethereal user
            pass: mailPassword,// generated ethereal password
                     
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        // marnetto.cloud@gmail.com
        from: `"TTGV Contact" <${mailSender}>`, // sender address
        // vic.marnetto@gmail.com
        to: `${mailReceiver}`, // list of receivers
        subject: req.body.subject, // Subject line
        text: "Contact TTGV", // plain text body
        html: output, // html body
    };

    transporter.sendMail(mailOptions, (error,info) => {
        if (error) {
            return console.log(error);
            
        }
        // console.log("Message sent: %s", info.messageId);
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        
        res.redirect('/');
    
    })
 }
    
)

app.use((req, res) => {
    res.render('error404')
})


app.listen(3000, function () {
    console.log("Server started...");
    console.log("http://localhost:3000");
    
})


//    __________
//   / ___  ___ \
//  / / @ \/ @ \ \
//  \ \___/\___/ /\
//   \____\/____/||
//   /     /\\\\\//
//   |     |\\\\\\
//    \      \\\\\\
//     \______/\\\\
//      _||_||_
//       -- --


//     ___               _   __   _        __                    __  ___     
//   / _ )  __ __      | | / /  (_) ____ / /_ ___   ____       /  |/  /     
//  / _  | / // /      | |/ /  / / / __// __// _ \ / __/      / /|_/ /      
// /____/  \_, /       |___/  /_/  \__/ \__/ \___//_/        /_/  /_/       
//        /___/                                                             
