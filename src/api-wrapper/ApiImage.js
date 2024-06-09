"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/images`;

const ApiGetImages = (data) => {
    return axios.get(`${url}?limit=${data?.perPage}&page=${data?.pageNo}`)
        .then(res => res.data).catch(res => res.data)
}
const ApiGetAllImages = (data) => {
    return axios.get(`${url}/all`)
        .then(res => res.data).catch(res => res.data)
}

const ApiEditImage = (id, data) => {
    return axios.put(`${url}/${id}`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiAddImage = (data) => {
    return axios.post(`${url}/add`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(res => res.data).catch(res => res.data)
}


const ApiDeleteImage = (id) => {
    return axios.delete(`${url}/${id}`)
        .then(res => res.data).catch(res => res.data)
}
export { ApiGetImages, ApiEditImage, ApiAddImage, ApiDeleteImage, ApiGetAllImages }
