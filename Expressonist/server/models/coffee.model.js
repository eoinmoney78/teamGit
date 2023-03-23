const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    roaster: { type: String, required: true },
    coffee: { type: String, required: true },
    process: { type: String, required: true },
    variety: String,
    elevation: Number,
    roast: String,
    in: { type: Number, required: true },
    out: { type: Number, required: true },
    time: { type: Number, required: true },
    grind: { type: Number, required: true },
    temp: { type: Number, required: true },
    wedge: Number,
    wdt: { type: Boolean, required: true },
    rdt: { type: Boolean, required: true },
    notes: String,
    img: String
});

module.exports = mongoose.model('User', UserSchema);
