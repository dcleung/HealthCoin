var express = require('express');
var async = require('async');
var vogels = require('vogels');
var Joi = require('joi');
var AWS = require('aws-sdk');

/* GET home page. */
var getHome = function(req, res, next) {
  res.render('index', { name: 'Bob' , balance: '0', error: null});
}

var postJob = function(req, res) {
    var cost = req.body.inputCost;
    console.log(cost);
    res.render('index', { name: 'Bob' , balance: '0', error: null});    
}

var routes = {
    getHome : getHome,
    postJob : postJob
};

module.exports = routes;
