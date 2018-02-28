
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const path = require('path');
const session = require('express-session');

const app = express();

app.set('public',path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static(path.join(__dirname,'uploads')));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');


app.use(session({
    secret: 'a4f8071f-c873-4447-8ee2',
    cookie: { maxAge: 2628000000 },
    resave:false,
    saveUninitialized:false
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/',router);

app.listen(3000,()=>{
    console.log("Server Listening at port 3000");
});


