"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api/user`;

const ApiGetUser = (data) => {
    return axios.post(`${url}`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiEditUser = (id, data) => {
    return axios.put(`${url}/update/${id}`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiAddUser = (data) => {
    return axios.post(`${url}/create`, data)
        .then(res => res.data).catch(res => res.data)
}


const ApiDeleteUser = (id) => {
    return axios.delete(`${url}/delete/${id}`)
        .then(res => res.data).catch(res => res.data)
}
export { ApiGetUser, ApiEditUser, ApiAddUser, ApiDeleteUser }
