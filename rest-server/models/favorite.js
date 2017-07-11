var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dives: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dive'
    }]
}, {
    timestamps: true
});

var Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;
