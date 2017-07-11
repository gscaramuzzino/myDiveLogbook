var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorites = require('../models/favorite');
var Verify = require('./verify');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter
    .route('/')

    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        var userId = req.decoded._doc._id

        Favorites.find({
                user: userId
            })
            .populate(['dives'])
            .exec(function (err, succ) {
                if (err) return next(err);
                else res.json(succ);
            })
    })

    .post(function (req, res, next) {
        var userId = req.decoded._doc._id;

        Favorites.findOneAndUpdate({
                user: userId
            }, {
                $addToSet: {
                    dives: req.body
                }
            }, {
                upsert: true,
                new: true
            })
            .exec(function (err, succ) {
                if (err) return next(err);
                else res.json(succ);
            });
    })

    .delete(function (req, res, next) {
        var userId = req.decoded._doc._id

        Favorites.remove({
            user: userId
        }, function (err, succ) {
            if (err) return next(err);
            else res.json(succ);
        })
    })

favoritesRouter
    .route('/:diveId')

    .all(Verify.verifyOrdinaryUser)

    .delete(function (req, res, next) {
        var userId = req.decoded._doc._id;

        Favorites.findOneAndUpdate({
                'user': userId
            }, {
                $pull: {
                    dives: req.params.diveId
                }
            }, {
                new: true
            })
            .exec(function (err, succ) {
                if (err) return next(err);
                else res.json(succ);
            });
    });

module.exports = favoritesRouter