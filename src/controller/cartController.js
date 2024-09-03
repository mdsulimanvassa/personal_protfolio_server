const cartsCollection = require("../module/cartModule");

const cartCreate = async (req, res) => {
    try {
        const cart = req.body;
        const result = await cartsCollection.create(cart);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}
const cartReadData = async (req, res) => {
    try {
        const email = req.query.email;
        // console.log(email)
        // const filter = {email: email}
        const result = await cartsCollection.find({ email }).exec();
        res.status(200).send(result);
        // console.log('result',result)
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const deleteCartData = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await cartsCollection.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.status(404).send({message: error.message})
    }
};

module.exports = { cartCreate, cartReadData, deleteCartData }