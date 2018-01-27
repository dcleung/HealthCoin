var express = require('express');
var async = require('async');
var vogels = require('vogels');
var Joi = require('joi');
var AWS = require('aws-sdk');

/* GET home page. */
var getHome = function(req, res, next) {
  res.render('index', { title: 'Health' , balance: '0', error: null});
}

var routes = {
    getHome : getHome
};

module.exports = routes;
