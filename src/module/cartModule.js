const { model, Schema } = require("mongoose");

// Define the user schema
const userSchema = new Schema({
    productId: {
     type: String,
    },
    name: {
     type: String,
    },
    email: {
     type: String,
    },
    price: {
     type: String,
    },
    img: {
     type: String,
    },
 }, { timestamps: true });
 
 const cartsCollection = model('Carts',userSchema );
 
 module.exports = cartsCollection;