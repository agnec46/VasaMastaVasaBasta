import mongoose from "mongoose";

const uslugaSchema = new mongoose.Schema({
    name: {type: String, unique: false},
    price: Number,
})

const zakSchema = new mongoose.Schema({
    date: Date,
    startDate: Date,
    endDate: Date,
    firmaName: String,
    services: [uslugaSchema],
    kvadratura: Number,
    tip: String,
    povrsinaBazena: Number,
    povrsinaZelenilo: Number,
    povrsinaLezaljke: Number,
    povrsinaFontane: Number,
    brojStolova: Number,
    brojStolica: Number,
    napomena: String,
    status: Number,
    komentar: String,
    vlasnik: String,
    dekorater: String,
    basta: Object,
    poslednjeOdrzavanje: Date,
    odrzavanje: Number
})

export default mongoose.model('Zakazivanje',zakSchema,'zakazivanja')