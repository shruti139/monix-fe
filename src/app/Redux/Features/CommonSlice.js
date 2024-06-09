'use client'
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    rowPerPage: 10,
    userDetails: {}
};

export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        loading: (state, payload) => {
            state.isLoading = payload.payload;
        },
        handleRowPerPage: (state, payload) => {
            state.rowPerPage = payload.payload
        },
        setUserDetail: (state, payload) => {
            state.userDetails = payload.payload;
        }
    },
});

export const { loading, handleRowPerPage, setUserDetail } = commonSlice.actions

export default commonSlice.reducer;