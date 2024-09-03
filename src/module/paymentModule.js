// const { model, Schema, mongoose } = require("mongoose");

// const userSchema = new Schema({
//     productId: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     }],
//     cartId: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Cart', 
//         required: true
//     }],
//     shippingData: {
//     type: Schema.Types.Mixed,
//     required: true
// },
//     price: {
//     type: Number,
//     required: true
// },
//     transactionId: {
//     type: String,
//     required: true
// },
//  status: {
//     type: String,
//     enum: ['pending', 'completed', 'failed'],
//     default: 'pending'
// },
// },{timestamps: true,});

// const orderCollection = model('Order', userSchema);
// module.exports = orderCollection;