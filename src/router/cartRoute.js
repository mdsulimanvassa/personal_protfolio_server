const express = require('express');
const { cartCreate, cartReadData, deleteCartData } = require('../controller/cartController');
const { verifyToken, verifyAdmin } = require('../middleware/middleware');
const cartRouter = express.Router();

cartRouter.post('/cart', cartCreate);
cartRouter.get('/carts', cartReadData);
cartRouter.delete('/deletProductCart/:id', deleteCartData);

module.exports = cartRouter;