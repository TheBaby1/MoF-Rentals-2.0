const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    age: { type: Number, required: true },
    price: {type: Number, required: true },
    description: {type: String, required: true } 

});

module.exports = mongoose.model('Rental', RentalSchema);