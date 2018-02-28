
const express = require('express');
const path = require('path');
const mongojs = require('mongojs');

const db = mongojs('mongodb://aravind:aravi@ds149934.mlab.com:49934/superresolution',['user','uploads']);

const app = express();

const signup = require('./service/signup.js');
const signin = require('./service/login.js');
const upload = require('./service/upload.js');

const zerorpc = require('zerorpc');

var server = new zerorpc.Server({
    videoFormat: function(name, reply) {
        console.log("called",name.toString());
        let newVideo = name.toString()+"_superres.avi";
        db.uploads.findAndModify({query:{filename:name.toString()},update:{$set:{superresvideo:newVideo}},new:true},(err,docs)=>{
            if (!err){
                console.log(docs);
                console.log("Sucessfully updated");
            }
        })
    }
});
server.bind("tcp://0.0.0.0:4342");


app.get('/',(req,res)=>{
   res.render('index');
});

app.get('/dashboard',(req,res)=>{
    if (req.session.name){
        res.render('dashboard');
    }
    else{
        res.redirect('/');
    }
});

app.post('/login',(req,res)=>{
    console.log(req.body);

    signin.login(db,req.body).then(()=>{
        req.session.name = req.body.email;
        console.log(req.session);
        res.redirect('/dashboard');
    }).catch(()=>{
        res.send({status:false});
    });
});

app.post('/signup',(req,res)=>{
    console.log(req.body);
   signup.signup(db,req.body).then((data)=>{
       res.redirect('/');
   }).catch((err)=>{
       res.send(err);
   });
});

app.post('/uploadvideo',(req,res)=>{

    console.log("here");
    console.log(req.session.name);
    upload.uploadvideo(req,db,req.session.name).then((status)=>{
        res.redirect('/dashboard');
    }).catch((err)=>{
        return err;
    });

});




module.exports = app;