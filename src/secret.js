require('dotenv').config();

const port = process.env.PORT || 5000;
const mongodbURL = process.env.DATABASE_ACCESS;
const tokenSecretKey = process.env.TOKEN_SECRET_KEY || trew344324iueojugfyffteyd;
const payment_id = process.env.PAYMENT_ID;
const payment_password = process.env.PAYMENT_PASSWORD;
const server_url = process.env.URL;
const stripe_secret = process.env.STRIPE_SECRET_KEY;

module.exports = {port, server_url, mongodbURL, tokenSecretKey, payment_id, payment_password, stripe_secret}