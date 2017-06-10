var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Dives = require('../models/dive');
var Verify = require('./verify');

var divesRouter = express.Router();
divesRouter.use(bodyParser.json());

divesRouter
    .route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        var userId = req.decoded._doc._id

        Dives.find({
                user: userId
            })
            .exec(function (err, succ) {
                if (err) return next(err);
                else res.json(succ);
            })
    })

    .post(function (req, res, next) {
        req.body.user = req.decoded._doc._id;
        Dives.create(req.body, function (err, succ) {
            if (err) return next(err);
            else res.json(succ);
        });
    })


divesRouter
    .route('/:diveId')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        var userId = req.decoded._doc._id;
        req.body.user = userId;

        Dives.findOne({
            "user": userId,
            "_id": req.params.diveId,
        }, function (err, dive) {
            if (err) return next(err);
            else res.json(dive);
        });
    })
    .put(function (req, res, next) {
        var userId = req.decoded._doc._id;
        req.body.user = userId;

        Dives.findOneAndUpdate({
            "user": userId,
            "_id": req.params.diveId,
        }, {
            $set: req.body
        }, {
            new: true
        }, function (err, succ) {
            if (err) return next(err);
            else res.json(succ);
        });
    })
    .delete(function (req, res, next) {
        Dives.findOneAndRemove({
            "user": req.decoded._doc._id,
            "_id": req.params.diveId,
        }, function (err, succ) {
            if (err) return next(err);
            else res.json(succ);
        });
    });

module.exports = divesRouter