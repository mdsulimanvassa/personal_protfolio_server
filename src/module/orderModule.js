const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const PaymentSchema = new Schema({
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }],
    cartId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    }],
    shipping: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
    },
    email:{type: String, required: true},
    paymentId: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Done', 'Cancel'],
        default: 'Pending',
        required: true,
    },
    date: { type: Date, default: Date.now },
})

const order = model('Orders', PaymentSchema);

module.exports = order;