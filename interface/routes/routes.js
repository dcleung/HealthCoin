var express = require('express');
var async = require('async');
var vogels = require('vogels');
var Joi = require('joi');
var AWS = require('aws-sdk');
//vogels.AWS.config.loadFromPath('credentials.json');

var Account = vogels.define('Account', {
  hashKey : 'username',

  schema : {
    username: Joi.string(),
    email   : Joi.string().email(),
    name    : Joi.string(),
    password : Joi.string()
  }
});

/* GET home page. */
var getHome = function(req, res) {
    console.log("GET home");
    res.render('index.ejs', { name: 'Bob' , balance: '0', error: null});
}

/* GET visualizer page. */
var getVisualizer = function(req, res) {
    console.log("GET visualizer");
    res.render('visualizer.ejs', { name: 'Bob' , balance: '0', error: null});
}

/* GET about page. */
var getAbout = function(req, res) {
    console.log("GET visualizer");
    res.render('about.ejs', { name: 'Bob' , balance: '0', error: null});
}

/* POST job page. */
var postJob = function(req, res) {
    var cost = req.body.inputCost;
    var name = req.body.inputName;
    console.log(cost);
    console.log(name);
    res.redirect('/', { name: 'Bob' , balance: 'poop', error: null});
}

var routes = {
    getHome : getHome,
    postJob : postJob,
    getVisualizer : getVisualizer,
    getAbout : getAbout
};

module.exports = routes;
