var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var licenceSchema = new Schema({
    numLicence: Number,
    numInstructor: Number,
    typeLicence: String,
    diveCenter: String,
    dateOfLicence: Date
}, {
    timestamps: true
});

var userLicenceSchema = new Schema({
    licence: [licenceSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

var Licences = mongoose.model('Licences', userLicenceSchema);

module.exports = Licences;