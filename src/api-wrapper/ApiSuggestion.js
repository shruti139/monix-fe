"use client"
import axios from "axios";

let url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/suggestion`;

const ApiGetSuggestion = (data) => {
    return axios.get(`${url}`)
        .then(res => res.data).catch(res => res.data)
}
const ApiGetAllAds = (data) => {
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ads.json`)
        .then(res => res.data).catch(res => res.data)
}

const ApiEditCategory = (id, data) => {
    return axios.put(`${url}/${id}`, data)
        .then(res => res.data).catch(res => res.data)
}

const ApiAddAds = (data) => {
    return axios.post(`${url}/ads/add`, data)
        .then(res => res.data).catch(res => res.data)
}


const ApiDeleteSuggestion = (id) => {
    return axios.delete(`${url}/${id}`)
        .then(res => res.data).catch(res => res.data)
}
export { ApiGetSuggestion, ApiEditCategory, ApiAddAds, ApiDeleteSuggestion, ApiGetAllAds }
