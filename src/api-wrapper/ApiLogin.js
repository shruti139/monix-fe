"use client"
import axios from "axios";
let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`;

const ApiLogin = (data) => {
    return axios.post(`${url}/signIn`, data)
        .then(res => res.data).catch(res => res.data)
}

export { ApiLogin }
