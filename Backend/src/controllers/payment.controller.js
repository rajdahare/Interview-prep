const razorpay = require("../config/razorpay");
const Payment = require("../models/payment.model");
const crypto = require("crypto");

/**
 * 
 * @description  initiate / create payment
 * 
 */
async function createOrder(req, res) {

    try {

        const amount = 499;

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        });

        await Payment.create({
            user: req.user.id,
            razorpayOrderId: order.id,
            amount,
            status: "created"
        });

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

/**
 * 
 * @description verify payment
 * 
 */

async function verifyPayment(req, res) {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const body =
            razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            });
        }

        await Payment.findOneAndUpdate({
            razorpayOrderId: razorpay_order_id
        }, {
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: "paid"
        });

        const premiumExpiryDate = new Date();

        premiumExpiryDate.setMonth(
            premiumExpiryDate.getMonth() + 1
        );

        await userModel.findByIdAndUpdate(
            req.user.id, {
                isPremium: true,
                premiumPlan: "monthly",
                premiumActivatedAt: new Date(),
                premiumExpiresAt: premiumExpiryDate
            }
        );

        res.status(200).json({
            success: true,
            message: "Premium activated successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


module.exports = { createOrder, verifyPayment }