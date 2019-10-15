const mongoose = require('mongoose');

const car_schema = mongoose.Schema({
    car_num: {
        type: String,
        required: true
    },
    carmodel: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required:true
    },
    capacity:{
        type: Number,
        required:true
    },
    rentperday: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }
})



module.exports = mongoose.model('cars',car_schema);
