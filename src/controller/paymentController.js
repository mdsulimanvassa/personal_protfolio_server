// const mongoose = require('mongoose');
// const { payment_id, payment_password, server_url } = require('../secret');
// const SSLCommerzPayment = require('sslcommerz-lts');
// const orderCollection = require('../module/paymentModule');
// const productCollection = require('../module/productModule');

// const paymentIntent = async (req, res) => {
//     try {
//         const product = req.body;
//         // console.log(product)

//         const tran_id = new mongoose.Types.ObjectId().toString();
//         const is_live = false;

//         const data = {
//             total_amount: product.total,
//             currency: 'BDT',
//             tran_id: tran_id,
//             success_url: `${server_url}/success/payment`,
//             fail_url: `${server_url}/fail/${tran_id}`,
//             cancel_url: `${server_url}/cancel/${tran_id}`,
//             ipn_url: 'http://localhost:3030/ipn',
//             shipping_method: 'Courier',
//             product_name: 'Computer', 
//             product_category: 'Electronic',
//             product_profile: 'general',
//             cus_name: product.data.name,
//             cus_email: product.data.email,
//             cus_add1: product.data.address,
//             cus_add2: 'Dhaka',
//             cus_city: 'Dhaka',
//             cus_state: 'Dhaka',
//             cus_postcode: '1000',
//             cus_country: 'Bangladesh',
//             cus_phone: product.data.phone,
//             cus_fax: '01711111111', 
//             ship_name: product.data.name,
//             ship_add1: product.data.address, 
//             ship_add2: 'Dhaka',
//             ship_city: 'Dhaka',
//             ship_state: 'Dhaka',
//             ship_postcode: 1000,
//             ship_country: 'Bangladesh',
//         };

//         const saveData = {
//             productId: product.productId,
//             cartId: product.cartId,
//             shippingData: product.data,
//             price: product.total,
//             transactionId: tran_id,
//             status: "pending",
//         };
//         const order = await orderCollection.create(saveData);
//         if (order) {
//             const sslcz = new SSLCommerzPayment(payment_id, payment_password, is_live);
//             sslcz.init(data).then(apiResponse => {
//                 let GatewayPageURL = apiResponse.GatewayPageURL;

//                 if (GatewayPageURL) {
//                     res.send({ url: GatewayPageURL });
//                 } else {
//                     res.status(500).send({ message: 'Failed to get payment gateway URL' });
//                 }
//             }).catch(error => {
//                 res.status(500).send({ message: 'Payment initialization failed', error: error.message });
//             });
//         } else {
//             res.status(500).send({ message: 'Order saving failed' });
//         }
//     } catch (error) {
//         res.status(404).send({ message: error.message });
//     }
// };

// const sucessPayment = async (req, res) => {
//     const result = req.body;
//     if(result.status !== 'VALID'){
//         throw new Error('Unauthorazion access, invalid access')
//     }
//     const query = { 
//         transactionId: result.tran_id
//     };
//     const update = {
//         $set:{status: 'success',}
//     };
//     const updateData = await orderCollection.updateOne(query, update);
//     res.redirect('http://localhost:5173/')
// }

// const failPayment = async (req, res) => {
//     const result = req.params.tran_id;
//     console.log(result)
//     const query = {transactionId: result}
//     const deleteOne = await orderCollection.findOneAndDelete(query);
//     console.log(deleteOne)
// }
// const cencelPayment = async (req, res) => {
//     const result = req.params.tran_id;
//     const query = {transactionId: result}
//     const deleteOne = await orderCollection.findOneAndDelete(query);
//     console.log(deleteOne)
// }


// module.exports = { paymentIntent, sucessPayment, failPayment, cencelPayment }