var express = require('express');
var async = require('async');
var vogels = require('vogels');
var Joi = require('joi');
var AWS = require('aws-sdk');
var creds = require('./credentials.json');
//vogels.AWS.config.loadFromPath('./credentials.json');
vogels.AWS.config.update({accessKeyId: creds.accessKeyId, secretAccessKey: creds.secretAccessKey, region: "us-east-1"});

var Account = vogels.define('Account', {
  hashKey : 'username',

  timestamps : true,

  schema : {
    username: Joi.string(),
    email   : Joi.string().email(),
    name    : Joi.string(),
    password : Joi.string()
  }
});

var Job = vogels.define('Job', {
  hashKey : 'JobID',

  timestamps : true,

  schema : {
    JobID: vogels.types.uuid(),
    name    : Joi.string(),
    genome : Joi.string(),
    cost : Joi.number(),
    status : Joi.string()
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
    Job.scan().loadAll().exec(function(err, resp) {
        if (resp) {
            items = resp.Items;
            console.log(resp.Items);
            /*items.sort(function(a, b) {
                return parseFloat(a.attrs.msgID) - parseFloat(b.attrs.msgID);
            });
            var size = Object.keys(items).length;
            for (var i = 0; i < size; i++) {
                console.log(items[i].attrs.message);
                chatValues.push(items[i].attrs.message);
            }*/
        }
        res.render('index.ejs', {
            name: 'Bob' , balance: '0', error: null
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

/* POST job page. */
var postJob = function(req, res) {
    var cost = req.body.inputCost;
    var name = req.body.inputName;
    var genome = req.body.inputGenome;

    Job.create({
                cost : cost,
                name : name,
                genome : genome,
                status : 'Incomplete'
            }, function(err, post) {
                if (err) {
                    res.render('index.ejs', { error: 'Error accessing database' , balance: '0'});
                } else {
                    Job.scan().loadAll().exec(function(err, resp) {
                        if (resp) {
                            items = resp.Items;
                            console.log(resp.Items);
                            /*items.sort(function(a, b) {
                                return parseFloat(a.attrs.msgID) - parseFloat(b.attrs.msgID);
                            });
                            var size = Object.keys(items).length;
                            for (var i = 0; i < size; i++) {
                                console.log(items[i].attrs.message);
                                chatValues.push(items[i].attrs.message);
                            }*/
                        }
                        res.render('index.ejs', {
                            name: 'Bob' , balance: '0', error: null
                        });
                    });
                }
    });

    res.render('index.ejs', { name: 'Bob' , balance: '0', error: null});
}

var routes = {
    getHome : getHome,
    postJob : postJob,
    getVisualizer : getVisualizer,
    getAbout : getAbout,
    getMine : getMine
};

module.exports = routes;
