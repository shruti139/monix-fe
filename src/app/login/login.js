"use client"

import { ApiLogin } from "@/api-wrapper/ApiLogin";
import Toast from "@/helper/toast/Toast";
import { useForm } from "react-hook-form";
import { IconEyeOff, IconEye } from '@/helper/imports/Imports';
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { loading, setUserDetail } from "../Redux/Features/CommonSlice";
import { useRouter } from "next/navigation";


function Login() {
    let router = useRouter();
    const dispatch = useDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const onSubmit = (data) => {
        let dataPass = {
            email: data.email,
            password: data.password
        }
        ApiLogin(dataPass)
            .then((res) => {
                console.log("🚀 ~ .then ~ res:", res)
                if (res.data) {
                    dispatch(loading(true))
                    let userData = {
                        authToken: res.data?.token,
                        userId: res?.data?.user?._id,
                        name: res?.data?.user?.username,
                        role: res?.data?.user?.role
                    }
                    localStorage.setItem("authToken", userData.authToken);
                    dispatch(setUserDetail(userData))
                    Toast.success(res.message);
                    dispatch(loading(false))
                    router.push('/dashboard')
                } else {
                    dispatch(loading(false))
                    Toast.error(res.message);

                }
            }).catch((err) => {
                dispatch(loading(false))
                Toast.error("something went wrong!!");
            });
    }

    return (
        <>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 xs:w-[92%] xs:mx-auto sm:max-w-xl sm:mx-auto md:w-[32rem] md:max-w-2xl">
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-slate-500 to-slate-800 shadow-lg transform  rotateAnimation transition duration-500 ease-in-out  xs:rounded-3xl">
                    </div>
                    <div className="relative px-4 py-10 bg-white shadow-lg xs:rounded-3xl sm:p-20">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="max-w-md mx-auto">
                                <div>
                                    <h1 className="text-2xl font-semibold">Login</h1>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                        <div className="mb-2">
                                            <label className="block text-gray-700 text-sm font-bold mb-1" for="email">Email</label>
                                            <input className={`w-full px-2 py-2 border  rounded-md focus:outline-none ${errors.email ? "border-red-300" : "border-gray-300"}`}
                                                type="email" {...register('email', { required: true })} name="email" placeholder="Enter Email Address" />
                                        </div>
                                        {errors.email && <span className='text-xs font-semibold text-red-500' >Email is required</span>}
                                        <div className='relative  mb-2'>
                                            <label className="block text-gray-700 text-sm font-bold mb-1" for="email">Password</label>
                                            <input type={isPasswordVisible ? "text" : "password"} placeholder="Enter Password" {...register('password', { required: true })} className={`w-full px-2 py-2 border  rounded-md focus:outline-none ${errors.password ? 'border-2 border-red-500' : ''}`} />
                                            {
                                                isPasswordVisible ?
                                                    <IconEyeOff className='absolute right-2 bottom-3' onClick={() => { setIsPasswordVisible(!isPasswordVisible) }} /> :
                                                    <IconEye className='absolute right-2 bottom-3' onClick={() => { setIsPasswordVisible(!isPasswordVisible) }} />
                                            }
                                        </div>

                                        {errors.password && <span className='text-xs font-semibold text-red-500' >Password is required</span>}
                                        <div className="relative">
                                            <button className={`bg-slate-600 text-white rounded-md px-2 py-1 w-full ${errors.password || errors.email && "cursor-not-allowed"}`} type="submit" disabled={errors.password || errors.email}>Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form >
                    </div >
                </div >
            </div >
        </>
    )
}



export default Login;