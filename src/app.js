const express = require('express');
const app = express();
require('./db/mongoose');
const userRouter = require('./routers/user');
const foodRouter = require('./routers/food');
const adminRouter = require('./routers/admin');
const orderRouter = require('./routers/order');

app.use(express.json());
app.use(userRouter);
app.use(foodRouter);
app.use(adminRouter);
app.use(orderRouter);

module.exports = app;