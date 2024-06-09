'use client'

import { ApiCheckAccount, ApiConnectAccount, ApiGetSellerConfigAccount } from "@/api-wrapper/ApiAccountConfig";
import Toast from "@/helper/toast/Toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loading } from "../Redux/Features/CommonSlice";

function Settings() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm();


    const queryParameters = new URLSearchParams(window.location.search);
    const code = queryParameters.get("code");
    const dispatch = useDispatch();
    const userRole = useSelector((state) => state.common.userDetails)?.role

    const [configRes, setConfigRes] = useState();

    const CheckAccountLink = async () => {
        await ApiCheckAccount().then((res) => {
            if (res.connect) {
                setConfigRes({ ...res.checkConfig, connect: res.connect });
                localStorage.setItem("user_config", JSON.stringify({ ...res.checkConfig, connect: res.connect }))
                setValue("clientID", res.checkConfig.clientId)
                setValue("clinetSecret", res.checkConfig.clientSecret)
                setValue("redirectURL", res.checkConfig.redirect_uri)
            }

        }).catch((err) => {
            Toast.error("something went wrong");
        });
    }

    useEffect(() => {
        CheckAccountLink()
    }, [])


    const onSubmit = () => {
        // const Redirecturl = `https://signin.sandbox.ebay.com/ws/eBayISAPI.dll?SignIn&ru=https%3A%2F%2Fauth.sandbox.ebay.com%2Foauth2%2Fconsents%3Fclient_id%${data.clientID}%redirect_uri%${data.redirectURL}%26scope%3Dhttps%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%26state%26response_type%3Dcode%26hd%26consentGiven%3Dfalse&sgfl=sm`
        const Redirecturl = `https://signin.sandbox.ebay.com/ws/eBayISAPI.dll?SignIn&ru=https%3A%2F%2Fauth.sandbox.ebay.com%2Foauth2%2Fconsents%3Fclient_id%3Dshrutivi-amazeAPP-SBX-e5eb3929e-e387f1b6%26redirect_uri%3DVision_infotech-shrutivi-amazeA-rkbrqsgp%26scope%3Dhttps%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope%2Fsell.inventory%26state%26response_type%3Dcode%26hd%26consentGiven%3Dfalse&sgfl=sm`
        window.location.href = Redirecturl;
    }

    const ConnectAccount = async (data) => {
        await ApiConnectAccount(data)
            .then((res) => {
                if (res) {
                    dispatch(loading(false))
                    setTimeout(() => {
                        window.location = "http://localhost:3000/settings";
                    }, [2000])
                    Toast.success("Account Connected Successfully.");
                }
                else {
                    dispatch(loading(false))
                    Toast.error("Error in Connecting Account.");
                }
            }).catch((err) => {
                dispatch(loading(false))
                Toast.error("something went wrong");
            });

        localStorage.removeItem("user_config")
    }

    const getSellerAccountDetails = async () => {
        try {
            const res = await ApiGetSellerConfigAccount();
            return res.config;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    useEffect(() => {
        if (code) {
            let local = JSON.parse(localStorage.getItem("user_config"))
            let data;
            dispatch(loading(true))
            if (userRole === "Admin") {
                data = {
                    clientId: local.clientId || "",
                    clientSecret: local.clientSecret || "",
                    code: code,
                    redirect_uri: local.redirect_uri || ""
                }
                ConnectAccount(data)
            } else {
                return getSellerAccountDetails()
                    .then((config) => {
                        data = {
                            clientId: config.clientId || "",
                            clientSecret: config.clientSecret || "",
                            code: code,
                            redirect_uri: config.redirect_uri || ""
                        }
                        // Use the config here
                        ConnectAccount(data);
                    })
                    .catch((error) => {
                        console.error(error);
                        // Handle the error here
                    });
            }

        }

    }, [code]);


    return (
        <>
            <div className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 h-[100vh]">
                <div className="outer-box">
                    <div className='mb-2'>
                        <h4 className='text-xl font-normal mb-3'>Settings</h4>
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[50%] bg-white outline-none focus:outline-none">

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="p-6 flex-auto">
                                    {
                                        userRole == "Admin" &&
                                        <div className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                            <div className="mb-1 pt-0">
                                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-black-600  uppercase last:mr-0 mr-1">
                                                    Client ID
                                                </span>
                                                <input type="text" placeholder="Enter Clinet ID"  {...register('clientID', { required: true })}
                                                    className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none w-full ${errors.clientID ? 'border-2 border-red-500' : ''}`}
                                                />
                                            </div>
                                            {errors.clientID && <span className='text-xs font-semibold text-red-500 mb-2' >UserName is required</span>}
                                            <div className="mb-1 pt-0">
                                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-black-600  uppercase last:mr-0 mr-1">
                                                    Client Secret
                                                </span>
                                                <input type="text" placeholder="Enter Client Secret"  {...register('clinetSecret', { required: true })} className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none w-full ${errors.clinetSecret ? 'border-2 border-red-500' : ''}`} />
                                            </div>
                                            {errors.clinetSecret && <span className='text-xs font-semibold text-red-500 mb-2' >Client Secret is required</span>}
                                            <div className="mb-1 pt-0">
                                                <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-black-600  uppercase last:mr-0 mr-1">
                                                    Redirect URL
                                                </span>
                                                <input type="text" placeholder="Enter Redirect URL"  {...register('redirectURL', { required: true })} className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none w-full ${errors.redirectURL ? 'border-2 border-red-500' : ''}`} />
                                            </div>
                                            {errors.redirectURL && <span className='text-xs font-semibold text-red-500 mb-2' >Redirect URL is required</span>}

                                        </div>
                                    }
                                    <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">

                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            {configRes?.connect ? "UnLink Your Account" : "Link Your Account"}
                                            Link Ebay
                                        </button>
                                    </div>
                                </div>
                            </form>


                            {/*footer*/}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Settings;