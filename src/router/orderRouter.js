const express = require('express');
const { verifyToken, verifyAdmin } = require('../middleware/middleware');
const { paymentIntent, paymentSuccess, userPaymentRead, orderState, adminState, orderManage, orderStatus } = require('../controller/orderController');
const orderRouter = express.Router();

orderRouter.post('/create-payment-intent', verifyToken, paymentIntent);
orderRouter.post('/payment', verifyToken, paymentSuccess);
orderRouter.get('/payment-order/:email', verifyToken, userPaymentRead);
orderRouter.get('/admin-state', verifyToken, verifyAdmin, adminState);
orderRouter.get('/order-state', verifyToken, verifyAdmin,  orderState);
orderRouter.get('/order-manage', verifyToken, verifyAdmin,  orderManage);
orderRouter.post('/order-status', verifyToken, verifyAdmin,  orderStatus);

module.exports = orderRouter;