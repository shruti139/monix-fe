"use client"
import axios from "axios";
let url = `${process.env.NEXT_PUBLIC_API_URL}/api/seller/config`;

const ApiCheckAccount = () => {
    return axios.get(`${url}/checkAccount`)
        .then(res => res.data).catch(res => res.data)
}

const ApiConnectAccount = (data) => {
    return axios.post(`${url}/connectAccount`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiGetSellerConfigAccount = () => {
    return axios.get(`${url}`)
        .then(res => res.data).catch(res => res.data)
}

export { ApiCheckAccount, ApiConnectAccount, ApiGetSellerConfigAccount }
