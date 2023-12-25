const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: Number,
    type: String,
    memory: String,
    processor: String,
    os: String,
    availableStocks: Number,
});

const Mobile = mongoose.model('Mobile', mobileSchema);

module.exports = Mobile;
