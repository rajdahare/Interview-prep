const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const paymentRouter = express.Router();

const {
    createOrder,
    verifyPayment
} = require("../controllers/payment.controller")

// api/payment/create-order
paymentRouter.post("/create-order", authMiddleware.authUser, createOrder);
paymentRouter.post("/verify-payment", authMiddleware.authUser, verifyPayment);

module.exports = paymentRouter;