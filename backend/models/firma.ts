import mongoose from "mongoose";


const uslugaSchema = new mongoose.Schema({
    name: {type: String, unique: false},
    price: Number,
})

const firmaSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    address: String,
    location: String,
    contact: String,
    services: [uslugaSchema],
    workers: [String],
    startDate: Date,
    endDate: Date
})

export default mongoose.model('Firma',firmaSchema,'firme')