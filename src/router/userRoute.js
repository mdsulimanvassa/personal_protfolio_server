const express = require('express');
const { userCreate, accessToken, readUsers, updateUser, deleteUser, verifyUserAdmin } = require('../controller/userController');
const { verifyToken, verifyAdmin } = require('../middleware/middleware');
const userRouter = express.Router();

userRouter.post('/user', userCreate);
userRouter.post('/jwt', accessToken);
userRouter.get('/users',verifyToken, verifyAdmin, readUsers);
userRouter.patch('/users/admin/:id', verifyToken, verifyAdmin, updateUser);
userRouter.delete('/deletUser/:id',verifyToken, verifyAdmin, deleteUser);
userRouter.get('/users/admin/:email',verifyToken, verifyUserAdmin);

module.exports = userRouter;