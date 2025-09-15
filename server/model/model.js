const mongoose = require('mongoose');

let schema = new mongoose.Schema(
    {
    name : 
    {
        type : String,// name would be a string
        required: true,// name is a required property
        unique: true, // the value of name must be unique
        trim: true
    },
    dosage : 
    {
        type : String,// dosage would be a string
        required: true,// dosage is a required property
        match: [/^\d+-morning,\d+-afternoon,\d+-night$/, 'Invalid dosage format']
    },
    card : 
    {
        type: Number, // card would be a number
        required: true,
        min: 1
    },
    pack : {
        type: Number,
        required: true,
        min: 1
    },
    perDay : {
        type: Number,
        required: true,
        min: 1,
        max: 89
    },
});

module.exports = mongoose.model('drugs', schema);