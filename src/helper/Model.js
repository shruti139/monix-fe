'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm, IconEyeOff, IconEye } from '@/helper/imports/Imports';
import '../style/layout.css';

export const SimpleModel = ({ handleClose, onSubmit, openedModal, selectedUserData, showModal }) => {
    const [image, setImage] = useState()
    console.log("🚀 ~ SimpleModel ~ image:", image)
    const imageRef = useRef()
    const {
        register,
        formState: { errors },
        handleSubmit,
        clearErrors,
        setValue
    } = useForm()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        if (openedModal === "edit") {
            setValue('name', selectedUserData?.name);
            setValue('image', selectedUserData?.image);
            selectedUserData?.image && setImage(`${process.env.NEXT_PUBLIC_API_URL}/${selectedUserData?.image}`);
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
                                                            Image
                                                        </span>
                                                        <div className='flex gap-4 items-center'>
                                                            {image ? <div id="preview" class="my-4 flex">
                                                                <div class="relative w-32 h-32 object-cover rounded ">
                                                                    <div x-show="image.preview" class="relative w-32 h-32 object-cover rounded">
                                                                        <img src={image} class="w-32 h-32 object-cover rounded" />
                                                                    </div>


                                                                </div>
                                                            </div> : null}
                                                            {image ?
                                                                <button id="button" onClick={() => setImage(null)} class="my-2 flex px-3 py-1 text-sm items-center bg-slate-900 text-white rounded-lg hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                                                    Remove
                                                                </button>
                                                                : <div class="icons flex text-gray-500 m-2">
                                                                    <label id="select-image">
                                                                        <button onClick={() => imageRef.current.click()} type="button" class="my-2 flex px-3 py-1 text-sm items-center bg-slate-900 text-white rounded-lg hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                                                            <svg class="mr-2 cursor-pointer hover:text-gray-700  rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                                            </svg>
                                                                            Upload a file
                                                                        </button>
                                                                        <input hidden type="file"  {...register('image', { required: true })} ref={imageRef} onChange={(e) => {
                                                                            clearErrors("image")
                                                                            setValue('image', e.target.files[0])
                                                                            setImage(URL.createObjectURL(e.target.files[0]))
                                                                        }} />

                                                                    </label>
                                                                </div>}

                                                        </div>

                                                    </div>
                                                    {errors.image && <span className='text-xs font-semibold text-red-500 mb-2' >Image is required</span>}
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