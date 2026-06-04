const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    },

    razorpayPaymentId: {
        type: String
    },

    razorpaySignature: {
        type: String
    },

    amount: {
        type: Number,
        required: true
    },

    plan: {
        type: String,
        default: "premium"
    },

    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("payments", paymentSchema);