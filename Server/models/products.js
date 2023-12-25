const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    company: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
        unique: true
    },
    headphonetype: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    colour: {
        type: String,
        required: true,
    },
    feature: {
        type: Array,
        required: true,
    },
    availability: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    altimg: {
        type: Array,
        required: true,
    }

})

module.exports = mongoose.model("Product", ProductSchema); 
