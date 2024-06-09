"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/category`;

const ApiGetCategories = (data) => {
    return axios.get(`${url}?limit=${data?.perPage}&page=${data?.pageNo}`)
        .then(res => res.data).catch(res => res.data)
}
const ApiGetAllCategories = (data) => {
    return axios.get(`${url}/all`)
        .then(res => res.data).catch(res => res.data)
}

const ApiEditCategory = (id, data) => {
    return axios.put(`${url}/${id}`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiAddCategory = (data) => {
    return axios.post(`${url}/add`, data)
        .then(res => res.data).catch(res => res.data)
}


const ApiDeleteCategory = (id) => {
    return axios.delete(`${url}/${id}`)
        .then(res => res.data).catch(res => res.data)
}
export { ApiGetCategories, ApiEditCategory, ApiAddCategory, ApiDeleteCategory, ApiGetAllCategories }
