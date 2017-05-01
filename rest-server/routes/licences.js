var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Licences = require('../models/licence');
var Verify = require('./verify');

var licencesRouter = express.Router();
licencesRouter.use(bodyParser.json());

licencesRouter
    .route('/')
    .all(Verify.verifyOrdinaryUser)
    .get(function (req, res, next) {
        var userId = req.decoded._doc._id

        Licences.find({
                user: userId
            })
            .exec(function (err, licence) {
                if (err) return next(err);
                else res.json(licence);
            })
    })

    .post(function (req, res, next) {
        var userId = req.decoded._doc._id;


        Licences.findOne({
            "user": userId
        }, function (err, licence) {
            if (err) throw err;
            if (licence) {
                licence.dishes.push(licenceId);
                licence.save(function (err, lic) {
                    if (err) return next(err);
                    else res.json(lic);
                });
            } else {
                Licences.create(req.body, function (err, licence) {
                    if (err) return next(err);
                    licence.user = userId;
                    licence.dishes.push(req.body);
                    licence.save(function (err, lic) {
                        if (err) return next(err);
                        else res.json(lic);
                    });
                });
            }
        })

    })


licencesRouter
    .route('/:licenceId')
    .all(Verify.verifyOrdinaryUser)
    .put(function (req, res, next) {
        var userId = req.decoded._doc._id;

        Licences.findById(userId, function (err, lic) {
            if (err) return next(err);
            lic.licence.id(req.params.licenceId).remove();
            lic.licence.push(req.body);
            lic.save(function (err, lic) {
                if (err) return next(err);
                else res.json(lic);
            });
        });

    })
    .delete(function (req, res, next) {
        var userId = req.decoded._doc._id;

        Licences.findById(userId, function (err, lic) {
            if (err) return next(err);
            for (var i = (lice.licence.length - 1); i >= 0; i--) {
                lic.licence.id(lic.licence[i]._id).remove();
            }
            lic.save(function (err, result) {
                if (err) return next(err);
                else res.json(lic);
            });
        });

    });

module.exports = licencesRouter