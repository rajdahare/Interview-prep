import axios from "axios";

// const api = axios.create({
//     baseURL: "https://interview-prep-mpyn.onrender.com",
//     withCredentials: true,
// })

const api = axios.create({
    baseURL: "/",
    withCredentials: true,
});
export async function createOrder() {

    try {

        const response = await api.post("/api/payment/create-order")

        return response.data

    } catch (err) {
        console.log(err)
    }

}

export async function verifyPayment() {

    try {

        const response = await api.post("/api/payment/verify-payment")

        return response.data

    } catch (err) {
        console.log(err)
    }

}