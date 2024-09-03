const usersCollection = require("../module/userModule");
const { tokenSecretKey } = require("../secret");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // console.log('Inside verifyToken', req.headers.authorization);
    try {
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'unauthorized access' });
        }

        const token = req.headers.authorization.split(' ')[1]; // Extract token
        if (!token) {
            return res.status(401).send({ message: 'Token not found' });
        }

        jwt.verify(token, tokenSecretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'unauthorized access' });
            }
            req.decoded = decoded;
            next();
        });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

const verifyAdmin = async (req, res, next) => {
    try {
       const email = req.decoded.email;
        
        const query = { email: email };
        const user = await usersCollection.findOne(query);
        
        if (user && user?.role === 'admin') {
            next(); 
        } else {
            res.status(403).send({ message: 'Forbidden access' });
        }
    } catch (error) {
        console.error("Error verifying admin role:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

module.exports = { verifyToken, verifyAdmin }