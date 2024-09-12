const express = require('express');
const { productreade, singleProduct, deleteProduct, updateProduct, productCreate, updateSingleProduct, productPagination } = require('../controller/productController');
const { verifyToken, verifyAdmin } = require('../middleware/middleware');

const productRouter = express.Router();

productRouter.get('/products', productreade);
productRouter.get('/api/products', productPagination);
productRouter.get('/products/:key', singleProduct);
productRouter.delete('/product/:id', verifyToken, verifyAdmin, deleteProduct);
productRouter.get('/product/:id', verifyToken, verifyAdmin, updateProduct);
productRouter.post('/product', verifyToken, verifyAdmin, productCreate);
productRouter.patch('/product/:id', verifyToken, verifyAdmin, updateSingleProduct);

module.exports = productRouter;
