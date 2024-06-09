"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/subCategory`;

const ApiGetSubCategories = (data) => {
    return axios.get(`${url}?limit=${data?.perPage}&page=${data?.pageNo}`)
        .then(res => res.data).catch(res => res.data)
}
const ApiGetSubCategoriesByCategory = (id) => {
    return axios.get(`${url}/category/${id}`)
        .then(res => res.data).catch(res => res.data)
}

const ApiEditSubCategory = (id, data) => {
    return axios.put(`${url}/${id}`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiAddSubCategory = (data) => {
    return axios.post(`${url}/add`, data)
        .then(res => res.data).catch(res => res.data)
}


const ApiDeleteSubCategory = (id) => {
    return axios.delete(`${url}/${id}`)
        .then(res => res.data).catch(res => res.data)
}
export { ApiGetSubCategories, ApiEditSubCategory, ApiAddSubCategory, ApiDeleteSubCategory, ApiGetSubCategoriesByCategory }
