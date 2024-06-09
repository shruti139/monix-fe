"use client"
import axios from "axios";
let url = `${process.env.NEXT_PUBLIC_API_URL}/api/seller/inventory`;

const ApigetInventory = (data) => {
    return axios.post(`${url}/get`, data)
        .then(res => res.data).catch(res => res.data)
}

export { ApigetInventory };
