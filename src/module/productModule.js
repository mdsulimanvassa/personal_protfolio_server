const { text } = require('body-parser');
const { Schema, model } = require('mongoose');

// Define the user schema
const productSchema = new Schema({
   name: {
    type: String,
    required: true,
   },
   category: {
    type: String,
    required: true,
   },
   seller: {
    type: String,
    required: true,
    set: v => v.toUpperCase(),
   },
   key: {
    type: String,
    required: true,
    set: v => v.toUpperCase(),
   },
   price: {
    type: Number,
    required: true,
   },
   star: {
    type: Number,
    required: true,
   },
   stock: {
    type: Number,
    required: true,
   },
   img: {
    type: String,
    required: true,
   },
}, { timestamps: true });

const productCollection = model('Products',productSchema );

module.exports = productCollection;