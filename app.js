// LAYOUTS
const publicLayout = 'main';
const adminLayout = 'adminMain';

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
const articleSingleController = require('./controllers/visit-public/articleSingle');
const createArticleController = require('./controllers/admin-pannel/actus/articleAdd');
const articlePostController = require('./controllers/admin-pannel/actus/articlePost');
const articleEditGetController = require('./controllers/admin-pannel/actus/articleEditGet');
const articleDeleteController = require('./controllers/admin-pannel/actus/articleDelete');
const homepage = require('./controllers/visit-public/actus');
const index = require('./controllers/visit-public/index');
// user

const userLogin = require('./controllers/visit-public/userLogin');
const userLoginAuth = require('./controllers/userLoginAuth');
const userLogout = require('./controllers/userLogout');
// ADMIN
const adminPannel = require('./controllers/admin-pannel/pannel')
    , adminPannelTrombi = require('./controllers/admin-pannel/trombi/admin-pannelTrombi')
    , adminPannelActus = require('./controllers/admin-pannel/actus/admin-pannelActus')
    , adminPannelContact = require('./controllers/admin-pannel/contact/admin-pannelContact.js')
    , adminPannelCalendar = require('./controllers/admin-pannel/calendar/admin-pannelCalendar')
    , adminUpdateContact = require('./controllers/admin-pannel/contact/contactUpdate.js')
    , adminCreateOne = require('./controllers/admin-pannel/admins/userCreate')
    , adminRegisterOne = require('./controllers/admin-pannel/admins/userRegister')
    , adminEditOne = require('./controllers/admin-pannel/admins/userEdit')
    , adminUpdateOne = require('./controllers/admin-pannel/admins/userUpdate')
    , adminTrombiAdd = require('./controllers/admin-pannel/trombi/trombiAdd.js')
    , adminTrombiPost = require('./controllers/admin-pannel/trombi/trombiPost')
    , adminTrombiEdit = require('./controllers/admin-pannel/trombi/trombiEdit')
    , adminTrombiUpdate = require('./controllers/admin-pannel/trombi/trombiUpdate')


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

app.engine('handlebars', exphbs({
    helpers: {
        stripTags: stripTags
    },
    defaultLayout: publicLayout
}));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})



















// Route
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)

// CONNEXION / DECONNEXION
app.get('/admin/login', redirectAuthSuccess, userLogin)
app.post('/admin/loginAuth', redirectAuthSuccess, userLoginAuth)
app.get('/admin/logout', userLogout)

// VISIT PUBLIC
app.get("/", index)
app.get("/actus", homepage)
app.get("/actus/:id", articleSingleController)


// ====================== PANNEL ADMIN =========================
app.get('/admin-pannel', auth, adminPannel)
app.get('/admin-pannel/admins/create', auth, adminCreateOne)
app.post('/admin-pannel/admins/register', auth, redirectAuthSuccess, adminRegisterOne)
app.get('/admin-pannel/admins/edit/:id', auth, adminEditOne)
// app.get('/admin-pannel/admins/delete/:id')

// ================= TROMBI
app.get('/admin-pannel/trombi', auth, adminPannelTrombi)
app.get('/admin-pannel/trombi/add', auth, adminTrombiAdd)
app.get('/admin-pannel/trombi/edit/:id', auth, adminTrombiEdit)
// app.post('/admin-pannel/trombi/edit/post/:id')
// app.get('/admin-pannel/trombi/delete/:id')
// ====================== ACTUS
app.get('/admin-pannel/actus', auth, adminPannelActus)
app.get("/admin-pannel/actus/add", auth, createArticleController)
app.post("/admin-pannel/actus/post", auth, articleValidPost, articlePostController)
app.get("/admin-pannel/actus/delete/:id", auth, articleDeleteController)
app.get('/admin-pannel/actus/edit/:id', auth, articleEditGetController)
app.post("/admin-pannel/actus/edit/post/:id", function (req, res) {
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
// ======================== CALENDAR
app.get('/admin-pannel/calendar', auth, adminPannelCalendar)

// ======================== CONTACT
app.get('/admin-pannel/contactEdit', auth, adminPannelContact)
// app.post('/admin-pannel/contactEdit/post')







// ========================================================
// ========================================================
// ========================================================
// ========================================================
// ========================================================
// ========================================================
// ========================================================

app.get('admin-pannel/deleteAdmin/:id', async (req, res) => {

    const adminId = await Delete.findById(req.params.id)

    Delete.findByIdAndRemove(adminId, function (err) {
        if (err)
            throw err;
    })
    console.log(Delete);

    res.redirect('/admin-pannel')

})
app.get('admin-pannel/deleteTrombi/:id', async (req, res) => {

    const trombiId = await Delete.findById(req.params.id)

    Delete.findByIdAndRemove(trombiId, function (err) {
        if (err)
            throw err;
    })
    console.log(Delete);

    res.redirect('/admin-pannel/trombi')

})




























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
        tls: {
            rejectUnauthorized: false
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

    transporter.sendMail(mailOptions, (error, info) => {
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
