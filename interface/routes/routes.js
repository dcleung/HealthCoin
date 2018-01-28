var express = require('express');
var async = require('async');
var vogels = require('vogels');
var Joi = require('joi');
var AWS = require('aws-sdk');
var creds = require('./credentials.json');
vogels.AWS.config.update({accessKeyId: creds.accessKeyId, secretAccessKey: creds.secretAccessKey, region: "us-east-1"});

var Account = vogels.define('Account', {
  hashKey : 'username',

  timestamps : true,

  schema : {
    userID : vogels.types.uuid(),
    username: Joi.string(),
    email   : Joi.string().email(),
    name    : Joi.string(),
    password : Joi.string(),
    value : Joi.number()
  }
});

var Job = vogels.define('Job', {
  hashKey : 'JobID',

  timestamps : true,

  schema : {
    JobID : vogels.types.uuid(),
    user : Joi.string(),
    name    : Joi.string(),
    genome : Joi.string(),
    cost : Joi.number(),
    status : Joi.string(),
    user : Joi.string()
  }
});

vogels.createTables({
    'Account' : {readCapacity: 1, writeCapacity: 10},
    'Job' : {readCapacity: 1, writeCapacity: 10},
}, function (err) {
  if(err) {
    console.log('Error creating tables', err);
    process.exit(1);
  }
});

/* GET home page. */
var getHome = function(req, res) {
    console.log(req.session)
    if (!req.session.username) {
        res.render('signup.ejs', {error : null});
    }
    Job.scan().where('user').equals(req.session.username).loadAll().exec(function(err, resp) {
        var itemValues = [];
        if (resp) {
            items = resp.Items;
            /*items.sort(function(a, b) {
                return parseFloat(a.attrs.msgID) - parseFloat(b.attrs.msgID);
            });*/
            var size = Object.keys(items).length;
            for (var i = 0; i < size; i++) {
                itemValues.push(items[i].attrs);
            }
        }
        console.log(itemValues);
        res.render('index.ejs', {
            name: req.session.username , balance: req.session.balance , error: null, items : itemValues
        });
    });
}

/* GET mining page. */
var getMine = function(req, res) {
    res.render('mine.ejs', { name: 'Bob' , balance: '0', error: null});
}

/* GET visualizer page. */
var getVisualizer = function(req, res) {
    res.render('visualizer.ejs', { name: 'Bob' , balance: '0', error: null});
}

/* GET about page. */
var getAbout = function(req, res) {
    res.render('about.ejs', { name: 'Bob' , balance: '0', error: null});
}

/* GET DNA problem */
var getDNA = function(req, res) {
    // Put the database call here
    var dnaObj = new Object();
    dnaObj.genome = "blahblahblahtacoblah";
    dnaObj.targetGene = "blah"
    res.send(JSON.stringify(dnaObj));
}

/* POST job page. */
var postJob = function(req, res) {
    var cost = req.body.inputCost;
    var name = req.body.inputName;
    var genome = req.body.inputGenome;

    Job.create({
                cost : cost,
                name : name,
                genome : genome,
                status : 'Incomplete',
                user : req.session.username
            }, function(err, post) {
                if (err) {
                    res.render('index.ejs', { error: 'Error accessing database' , balance: '0'});
                } else {
                        res.redirect('/');
                };
    });
}

/* POST account page. */
var postAccount = function(req, res) {
    var username = req.body.inputUsername;
    var email = req.body.inputEmail;
    var name = req.body.inputName;
    var password = req.body.inputPassword;

    req.session.username = username;
    req.session.balance = 0;

    Account.create({
                username : username,
                email : email,
                name : name,
                password : password,
                value : 0
            }, function(err, post) {
                if (err) {
                    res.redirect('/')
                } else {
                    res.redirect('/');
                }
    });
}

var postCheck = function(req, res) {
    var username = req.body.loginUsername;
    var password = req.body.loginPassword;

    if (! username || ! password) {
        req.session.message = "One or more fields not filled in";
        res.redirect('/signup');
    } else {
        Account.get(username, function(err, acc) {
            if (err) {
                req.session.message = "Error accessing user database";
                res.redirect('/signup');
            } else if (acc) {
                if (acc.get('password').localeCompare(password) == 0) {
                    req.session.email = acc.get('email');
                    req.session.username = username;
                    req.session.key = acc.get('userID');
                    req.session.balance = acc.get('value');
                    res.redirect('/');
                } else {
                    req.session.message = "Password incorrect";
                    res.redirect('/signup');
                }
            } else {
                req.session.message = "Account not found";
                res.redirect('/signup');
            }
        });
    }
}

/* GET signup page. */
var getSignup = function(req, res) {
    res.render('signup.ejs', { error: req.session.message });
}

var routes = {
    getHome : getHome,
    postJob : postJob,
    getVisualizer : getVisualizer,
    getAbout : getAbout,
    getMine : getMine,
    postAccount : postAccount,
    getSignup : getSignup,
    postCheck : postCheck,
    getDNA : getDNA
};

module.exports = routes;
