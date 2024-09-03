// const express = require('express');
// const { paymentIntent, sucessPayment, failPayment, cencelPayment } = require('../controller/paymentController');
// const { verifyToken } = require('../middleware/middleware');
// const paymentRouter = express.Router();

// paymentRouter.post('/create-payment-intent', verifyToken, paymentIntent);
// paymentRouter.post('/success/payment', verifyToken, sucessPayment);
// paymentRouter.post('/fail/:tran_id', verifyToken, failPayment);
// paymentRouter.post('/cencel/:tran_id', verifyToken, cencelPayment);


// module.exports = paymentRouter;