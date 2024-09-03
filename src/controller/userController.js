const usersCollection = require("../module/userModule");
const jwt = require('jsonwebtoken');
const { tokenSecretKey } = require("../secret");

const accessToken = async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, tokenSecretKey, { expiresIn: "1d" });
    res.send({ token });
};

const userCreate = async (req, res) => {
    try {
        const user = req.body;
        const result = await usersCollection.create(user);
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const readUsers = async (req, res) => {
    try {
        const result = await usersCollection.find();
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;

        // Find the user by ID and update the role to 'admin'
        const result = await usersCollection.findByIdAndUpdate(id, { $set: { role: 'admin' } }, { new: true });

        // If the user is not found
        if (!result) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // console.log('Updated User:', result);
        res.send(result);
    } catch (error) {
        console.error('Error updating user role:', error.message);
        res.status(500).send({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await usersCollection.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.status(404).send({ message: error.message })
    }
};

const verifyUserAdmin = async (req, res) => {
    try {
        const email = req.params.email;
        if (email !== req.decoded.email) {
            return res.status(403).send({ message: 'Forbidden access' });
        }

        const query = { email: email };
        const user = await usersCollection.findOne(query);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const admin = user.role === 'admin';

        res.send({ admin });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = { userCreate, accessToken, readUsers, updateUser, deleteUser, verifyUserAdmin }