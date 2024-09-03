const mongoose = require('mongoose');
const { mongodbURL } = require('../secret');

const connectDtabase = async (options = {}) => {
    try {
        await mongoose.connect(mongodbURL, options)
        console.log("connect to DB is successfully")
    } catch (error) {
        console.error('Could not connect to DB:', error.toString())
    }
}

module.exports = connectDtabase;