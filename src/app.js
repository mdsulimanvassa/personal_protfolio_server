const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRouter = require('./router/productRoute');
const userRouter = require('./router/userRoute');
const cartRouter = require('./router/cartRoute');
const orderRouter = require('./router/orderRouter');
// const paymentRouter = require('./router/paymentRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//middleware router
app.use('/', productRouter);
app.use('/', userRouter);
app.use('/', cartRouter);
app.use('/', orderRouter);
// app.use('/', paymentRouter);



app.get('/', (req, res) => {
  res.send('hellow ')
})

app.use( (req, res ) => {
    res.status(404).send({message: 'route not found'})
  });


  module.exports = app;