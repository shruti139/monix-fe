'use client'

import { useEffect, useState } from 'react'
import { useForm, IconEyeOff, IconEye } from '@/helper/imports/Imports';
import '../style/layout.css';

export const SimpleModel = ({ handleClose, onSubmit, openedModal, selectedUserData, showModal }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue
    } = useForm()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        if (openedModal === "edit") {
            setValue('name', selectedUserData?.name);
        }
    }, [selectedUserData])
    return (
        <>
            {showModal &&
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative my-6 mx-3 modal-width">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        {openedModal === "add" ? "Add Category" : openedModal === "edit" ? "Edit Category" : "Delete Category"}
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={handleClose}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="relative p-6 flex-auto">
                                        <div className="my-4 text-blueGray-500 text-lg leading-relaxed">
                                            {
                                                openedModal === 'add' || openedModal === 'edit' ? <>
                                                    <div className="mb-1 pt-0">
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-black-600  uppercase last:mr-0 mr-1">
                                                            Category
                                                        </span>
                                                        <input type="text" placeholder="Enter category"  {...register('name', { required: true })}
                                                            className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none w-full ${errors.name ? 'border-2 border-red-500' : ''}`}
                                                        />
                                                    </div>
                                                    {errors.name && <span className='text-xs font-semibold text-red-500 mb-2' >Category is required</span>}


                                                </> : "Are you sure you want to delete this category ?"
                                            }
                                        </div>
                                    </div>
                                    {/*footer*/}

                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handleClose}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            {
                                                openedModal === "edit" ? "Save" : openedModal == "add" ? "Add Category" : "Delete Category"
                                            }
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </>
            }
        </>
    )
}