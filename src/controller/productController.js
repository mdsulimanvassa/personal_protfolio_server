const productCollection = require("../module/productModule");

const productreade = async (req, res) => {
    const search = req.query.search || "";
    const searchRegExp = new RegExp('.*' + search + '.*', 'i');
    const filter = {
        $or: [
            { name: { $regex: searchRegExp } },
            { by: { $regex: searchRegExp } },
        ]
    }
    const result = await productCollection.find(filter)
    res.send(result)
};

const singleProduct = async (req, res) => {
    const key = req.params.key;
    const quert = { key: key }
    const result = await productCollection.findOne(quert)
    res.send(result)
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: (id) };
        const result = await productCollection.deleteOne(query);
        res.send(result);
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: (id) }
        const result = await productCollection.findOne(query);
        res.send(result);
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};

const productCreate = async (req, res) => {
    const product = req.body;
    const productAdd = new productCollection({
        name: product.name,
        category: product.category,
        seller: product.seller,
        key: product.key,
        price: product.price,
        star: product.star,
        stock: product.stock,
        img: product.img,
    })
    try {
        const result = await productAdd.save();
        res.send(result);
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};

const updateSingleProduct = async (req, res) => {
    const product = req.body;
    const query = { _id: (req.params.id) };
    const updateDoc = {
        $set: {
            name: product.name,
            category: product.category,
            seller: product.seller,
            key: product.key,
            price: product.price,
            star: product.star,
            stock: product.stock,
            img: product.img,
        }
    }
    try {
        const result = await productCollection.findByIdAndUpdate(query, updateDoc);
        // console.log(result)
        res.send(result);
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
}

module.exports = { productreade, singleProduct, deleteProduct, updateProduct, productCreate, updateSingleProduct }