const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://hitarth:1234@cluster0-0aurc.mongodb.net/test?retryWrites=true&w=majority')