
const { stripe_secret } = require("../secret");
const Stripe = require("stripe")(stripe_secret);
const order = require('../module/orderModule');
const cartsCollection = require('../module/cartModule');
const usersCollection = require('../module/userModule');
const productCollection = require('../module/productModule');


const paymentIntent = async (req, res) => {
    try {
        const { total } = req.body;
        // console.log(total)
        const amount = parseInt(total * 100)
        // console.log(amount)
        const paymentIntent = await Stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ['card']
        });
        // console.log(paymentIntent)
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};

const paymentSuccess = async (req, res) => {
    const payments = req.body;
    // console.log(payments)
    const payment = new order({
        productId: payments.productId.map(id => (id)),
        cartId: payments.productId.map(id => (id)),
        shipping: {
            address: payments.shiping.address,
            name: payments.shiping.name,
            email: payments.shiping.email,
            phone: payments.shiping.phone,
        },
        email: payments.email,
        paymentId: payments.paymentId,
        price: payments.price,
        status: payments.status,
    });
    try {
        const savedPayment = await payment.save();
        // console.log('Payment saved:', savedPayment);
        const query = {
            _id: {
                $in: payments.cartId?.map(id => (id))
            }
        }
        const deletecart = await cartsCollection
            .deleteMany(query);
        // console.log('delete info', deletecart)
        res.send({ savedPayment, deletecart });
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};

const userPaymentRead = async (req, res) => {
    try {
        const email = req.params.email;
        const query = { email: email };
        if (email !== req.decoded.email) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        const orders = await order.find(query);

        const productResult = await order.aggregate([
            {
                $match: query,
            },
            {
                $unwind: '$productId'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productsItems',
                },
            },
            {
                $unwind: '$productsItems'
            },
            {
                $group: {
                    _id: {
                        id: '$productsItems._id',
                        name: '$productsItems.name',
                        image: '$productsItems.img',
                    },
                    by: { $first: '$productsItems.seller' },
                    quantity: { $sum: 1 },
                    price: { $sum: '$productsItems.price' }
                }
            },
            {
                $project: {
                    _id: 0,
                    id: '$_id.id',
                    name: '$_id.name',
                    image: '$_id.image',
                    quantity: '$quantity',
                    price: '$price',
                    by: '$by'
                }
            }
        ]);

        res.send({
            orders,
            productSummary: productResult
        });

    } catch (error) {
        res.status(404).send({ message: error.message });
    }
};

const adminState = async (req, res) => {
    try {
        const users = await usersCollection.estimatedDocumentCount();
        const products = await productCollection.estimatedDocumentCount();
        const orders = await order.estimatedDocumentCount();
        const payments = await order.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: '$price'
                    }
                }
            }
        ]);
        const revenue = payments.length > 0 ? payments[0].totalRevenue : 0;

        res.send({
            users,
            products,
            orders,
            revenue
        })
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};

const orderState = async (req, res) => {
    try {
        const result = await order.aggregate([
            {
                $unwind: '$productId'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productsItems',
                },
            },
            {
                $unwind: '$productsItems'
            },
            {
                $group: {
                    _id: '$productsItems.category',
                    quantity: { $sum: 1 },
                    revenue: { $sum: '$productsItems.price' }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    quantity: '$quantity',
                    revenue: '$revenue'
                }
            }
        ]);
        res.send(result)
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};

const orderManage = async (req, res) => {
    try {
        // const email = req.params.email;
        // const query = { email: email };
        // if (email !== req.decoded.email) {
        //     return res.status(403).send({ message: 'Forbidden access' });
        // }
        const ordersAll = await order.find();
        const orderResult = await order.aggregate([
            // {
            //     $match: query,
            // },
            {
                $unwind: '$productId'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productsItems',
                },
            },
            {
                $unwind: '$productsItems'
            },
            {
                $group: {
                    _id: {
                        id: '$productsItems._id',
                        name: '$productsItems.name',
                        image: '$productsItems.img',
                    },
                    quantity: { $sum: 1 },
                    seller: { $first: '$productsItems.seller' }
                }
            },
            {
                $project: {
                    _id: 0,
                    id: '$_id.id',
                    name: '$_id.name',
                    image: '$_id.image',
                    quantity: '$quantity',
                    seller: '$seller'
                }
            }
        ]);
        res.send({
            ordersAll,
            orderSummary: orderResult
        });
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};

const orderStatus = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const result = await order.findByIdAndUpdate(orderId,{status: req.body.status});
        res.send(result);
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

module.exports = { paymentIntent, paymentSuccess, userPaymentRead, adminState, orderState, orderManage, orderStatus }