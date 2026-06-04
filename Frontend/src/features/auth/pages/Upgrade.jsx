import { createOrder, verifyPayment } from "../services/payment.api";
import { loadRazorpayScript } from "../services/loadRazorpay";
import { useAuth } from "../hooks/useAuth";

const Upgrade = () => {
  const { user } = useAuth();

  const handlePayment = async () => {
    try {
      const loaded = await loadRazorpayScript();

      if (!loaded) {
        alert("Failed to load Razorpay");
        return;
      }
      

      const { order } = await createOrder();
      // console.log(user);
      // console.log(user?.username);
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "InterviewAI",
        description: "Premium Subscription",

        prefill: {
          name: user?.username || "",
          email: user?.email || "",
        },


        theme: {
          color: "#4f46e5",
        },

        handler: async function (response) {
          const result = await verifyPayment(response);

          if (result.success) {
            alert("Premium Activated Successfully!");
            window.location.reload();
          } else {
            alert("Payment Verification Failed");
          }
        },
      };

      // const razorpay = new window.Razorpay(options);
      // razorpay.open();
      // console.log("Razorpay Options:", options);

      const razorpay = new window.Razorpay(options);

      // razorpay.on("payment.failed", function (response) {
      //   console.log("Full Error:", response);

      //   alert(response.error.description);

      //   console.log("Payment ID:", response.error.metadata?.payment_id);
      //   console.log("Order ID:", response.error.metadata?.order_id);
      // });

      razorpay.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <main className="upgrade-page">
      <div className="upgrade-card">
        <h1>Upgrade to Premium</h1>

        <p className="subtitle">
          Unlock the full power of AI-powered interview preparation.
        </p>

        <div className="price-section">
          <h2>₹499</h2>
          <span>/ month</span>
        </div>

        <ul className="feature-list">
          <li>✅ Unlimited AI Interviews</li>
          <li>✅ Detailed Performance Reports</li>
          <li>✅ Advanced AI Feedback</li>
          <li>✅ Interview History & Analytics</li>
          <li>✅ Priority Feature Access</li>
          <li>✅ Future Premium Updates</li>
        </ul>

        <button
          className="upgrade-btn"
          onClick={handlePayment}
        >
          Upgrade Now ₹499
        </button>
      </div>
    </main>
  );
};

export default Upgrade;