const { Schema, model } = require('mongoose');

// Define the user schema
const userSchema = new Schema({
   name: {
    type: String,
   },
   email: {
    type: String,
   },
   password: {
    type: Number,
   },
   role: {
    type: String,
   }
}, { timestamps: true });

const usersCollection = model('Users',userSchema );

module.exports = usersCollection;