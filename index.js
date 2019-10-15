const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./mongo');

require('./model/cars')
require('./model/bookingstatus')

app.use(bodyParser.json());


const cars = mongoose.model('cars')
const bookingstatus = mongoose.model('bookingstatus')

app.get('/',(req,res)=>{
    res.send('hello user');
    };

app.get('/cars',async (req, res) =>{
    try {
        const car = await cars.find({});
        res.send(car);
    } catch (error) {
        res.status(500);
    }
});
app.get('/cars/bookingstatus', async (req, res) =>{
    try {
        const bookingstatus = await bookingstatus.find({});
        res.send(bookingstatus);
    } catch (error) {
        res.status(500);
    }
})
app.post('/cars',async (req, res) => {
    try {
        const car = new cars();
        car.car_num = req.body.car_num;
        car.carmodel = req.body.carmodel;
        car.rentperday = req.body.rentperday;
        car.availability = req.body.availability;
        await car.save();
        res.send(car);
    } catch (error) {
        res.status(500);
    }
});
app.post('/cars/bookingstatus', async (req, res) =>{
    try {
        const bookingStatus = new bookingstatus();
        bookingStatus.car_num = req.body.car_num;
        bookingStatus.customername = req.body.customername;
        bookingStatus.customernum = req.body.customernum;
        bookingStatus.issuedate = req.body.issuedate;
        bookingStatus.returndate = req.body.returndate;
        cars.availability = false;
        await bookingStatus.save();
        res.send(bookingStatus);
    } catch (error) {
        res.status(500);
    }
});
app.put('/cars/:carid', async (req,res) =>{
    try {
        const car = await cars.findByIdAndUpdate({ _id: req.params.carid},req.body,{new:true,runValidators:true});
        res.send(car);
    } catch (error) {
        res.status(500);
    }
})
app.delete('/cars/:carid', async (req, res) => {
    try {
    if(await cars.find({availability: true})){
        const temp = cars.find({availability: true})
        const car = await temp.findOneAndRemove({ _id: req.params.carid});
        res.send(car);
    }
    else{
        res.send({status: 'car is unavailable to remove'})
    }
        
    } catch (error) {
        res.status(500);
    }
})
app.get('/cars/available',async (req, res) => {
    try {
        if(
                await cars.find({
                availability: true
            })
        )
    {
        const car = await cars.find({
            availability: true
        });
        res.send(car);
    }
    else{
        res.send({status: "the car is not available"})
    }
    } catch (error) {
        res.status(500);
    }
});

app.listen(process.env.PORT,3000);
