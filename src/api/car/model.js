import {Schema, model } from 'mongoose';

const carSchema = new Schema({
    ownerName: {
        type:String,
        required: true
    },
    carBrand: [String],
    carNumber: String,
    carColor:String

});

const Car = model("Car", carSchema);

export default Car;