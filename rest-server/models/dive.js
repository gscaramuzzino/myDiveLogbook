var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Dive = new Schema({
    numDive: Number,
    date: Date,
    visibility: Number,
    mUnits: String,
    location: String,
    weight: Number,
    mType: String,
    temperature: Number,
    tempType: String,
    protection: String,
    conditions: String,
    depth: Number,
    time: Number,
    computer: Boolean,
    rpd: Boolean,
    erpdml: Boolean,
    startBarPsi: Number,
    endBarPsi: Number,
    startTime: Number,
    endTime: Number,
    buddy: String,
    diving: String,
    comments: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Dive', Dive);