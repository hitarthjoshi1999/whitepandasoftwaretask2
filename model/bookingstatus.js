const mongoose = require('mongoose');

const bookingstatus_schema = mongoose.Schema({
    car_num:{
        type: String,
        required: true
    },
    customername:{
        type: String,
        required: true
    },
    customernum:{
        type: Number,
        required: true
    },
    issuerdate: {
        type: String,
        required: true
    },
    returndate:{
        type: String,
        required: true
    },


})


module.exports = mongoose.model('bookingstatus',bookingstatus_schema);
