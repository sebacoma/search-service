const mongoose = require('mongoose');

const restrictionSchema = new mongoose.Schema({
    restrictionId: String, // UUID v4
    reason: String,
    creationDate: Date
});

const Restriction = mongoose.model('Restriction', restrictionSchema);
module.exports = Restriction;
