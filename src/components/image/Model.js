'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm, IconEyeOff, IconEye, Controller } from '@/helper/imports/Imports';
import SelectComponent from '../SelectComponent';
import { ApiGetAllCategories } from '@/api-wrapper/ApiCategory';
import ReactSelect from 'react-select';
import { ApiGetSubCategoriesByCategory } from '@/api-wrapper/ApiSubCategory';
// import '';

export const SimpleModel = ({ handleClose, onSubmit, openedModal, selectedUserData, showModal }) => {
    const [categories, setCategories] = useState()
    const [subCategories, setSubCategories] = useState([])
    const [image, setImage] = useState()
    const imageRef = useRef()
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        setValue,
        watch,
        clearErrors
    } = useForm()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const category = watch("category")
    useEffect(() => {
        if (openedModal === "edit") {
            setValue('id', selectedUserData?._id);
            setValue('name', selectedUserData?.name);
            setValue('imageType', selectedUserData?.imageType);
            setValue('category', { label: selectedUserData?.category?.name, value: selectedUserData?.category?._id });
            setValue('subcategory', { label: selectedUserData?.subcategory?.name, value: selectedUserData?.subcategory?._id });
            setValue('image', selectedUserData?.image);
            setValue('trending', selectedUserData?.trending);
            setImage([`${process.env.NEXT_PUBLIC_API_URL}/${selectedUserData?.image}`]);
        }
    }, [selectedUserData])

    useEffect(() => {
        getAllCategories()
    }, [])
    useEffect(() => {
        if (category?.value)
            getSubCategories()
    }, [category?.value])
    const getAllCategories = async () => {
        try {
            const res = await ApiGetAllCategories();
            setCategories(res?.categories?.map((item) => ({ label: item?.name, value: item?._id })));
            return res;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const getSubCategories = async () => {
        try {
            const res = await ApiGetSubCategoriesByCategory(category?.value)
            setSubCategories(res?.subcategory?.map((item) => ({ label: item?.name, value: item?._id })));
            return res;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    const trending = watch("trending")

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
                                        {openedModal === "add" ? "Add Image" : openedModal === "edit" ? "Edit Image" : "Delete Image"}
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
                                                        {image?.length ?  
                                                                image.map((item, i) => <div id="preview" key={i} class="my-4 flex">
                                                                    <div class="relative w-32 h-32 object-cover rounded ">
                                                                        <div x-show="image.preview" class="relative w-32 h-32 object-cover rounded">
                                                                            <img src={item} class="w-32 h-32 object-cover rounded" />
                                                                        </div>
                                                                        <div className='absolute top-2 cursor-pointer bg-white rounded-full right-2' onClick={() => {
                                                                            image.splice(i, 1)
                                                                            setImage([...image])
                                                                        }}>

                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </div>


                                                                    </div>
                                                                </div>)
                                                               
                                                                : null}
                                                                </div>
                                                                {(image?.length ) ?
                                                                <button id="button" onClick={() => setImage(null)} class="my-2 flex px-3 py-1 text-sm items-center bg-slate-900 text-white rounded-lg hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                                                    Remove
                                                                </button>
                                                                : <div class="icons flex text-gray-500 m-2">
                                                                    <button onClick={() => imageRef.current.click()} type='button' class="my-2 flex px-3 py-1 text-sm items-center bg-slate-900 text-white rounded-lg hover:bg-gray-300 focus:shadow-outline focus:outline-none">
                                                                        <svg class="mr-2 cursor-pointer hover:text-gray-700  rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                                        </svg>
                                                                        Upload a file
                                                                    </button>
                                                                    <div>
                                                                        <input hidden type="file" multiple={!selectedUserData?._id ? true : false}  {...register('image', { required: true })} ref={imageRef} onChange={(e) => {
                                                                            clearErrors("image")
                                                                            setValue('image',selectedUserData?._id ? e.target.files[0] : Object.values(e.target.files))
                                                                            setImage(selectedUserData?._id ?  [URL.createObjectURL(e.target.files[0])] : Object.values(e.target.files)?.map((item) => URL.createObjectURL(item)))
                                                                        }} />

                                                                    </div>

                                                                </div>}


                                                    </div>
                                                    {errors.image && <span className='text-xs font-semibold text-red-500 mb-2' >Image is required</span>}
                                                    <div className="mb-1 pt-0">
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-black-600  uppercase last:mr-0 mr-1">
                                                            Image Name
                                                        </span>
                                                        <input type="text" placeholder="Enter name"  {...register('name', { required: true })}
                                                            className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none w-full ${errors.name ? 'border-2 border-red-500' : ''}`}
                                                        />
                                                    </div>
                                                    {errors.name && <span className='text-xs font-semibold text-red-500 mb-2' >Name is required</span>}
                                                    <div className="mb-1 pt-0">
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-black-600  uppercase last:mr-0 mr-1">
                                                            Image Type
                                                        </span>
                                                        <div class="flex items-center ml-2 mt-2 mb-4">
                                                            <input id="country-option-1" {...register('imageType', { required: true })} type="radio" name="imageType" value="reel" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-1" aria-describedby="country-option-1" />
                                                            <label for="country-option-1" class="text-sm font-medium text-gray-900 ml-2 block">
                                                                Reel
                                                            </label>
                                                        </div>

                                                        <div class="flex items-center ml-2 mb-4">
                                                            <input id="country-option-2" type="radio" {...register('imageType', { required: true })} name="imageType" value="post" class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-2" aria-describedby="country-option-2" />
                                                            <label for="country-option-2" class="text-sm font-medium text-gray-900 ml-2 block">
                                                                Post
                                                            </label>
                                                        </div>
                                                    </div>
                                                    {errors.imageType && <span className='text-xs font-semibold text-red-500 mb-2' >Image Type is required</span>}
                                                    <div class="inline-flex items-center">
                                                        <label
                                                            class="relative flex cursor-pointer items-center rounded-full py-3 mr-2"
                                                            for="login"
                                                            data-ripple-dark="true"
                                                        >
                                                            <input
                                                                id="login"
                                                                checked={trending}
                                                                {...register('trending')}
                                                                type="checkbox"
                                                                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
                                                            />
                                                            <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    class="h-3.5 w-3.5"
                                                                    viewBox="0 0 20 20"
                                                                    fill="currentColor"
                                                                    stroke="currentColor"
                                                                    stroke-width="1"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                        clip-rule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </div>
                                                        </label>
                                                        <label
                                                            class="mt-px cursor-pointer select-none font-light text-gray-700"
                                                            for="login"
                                                        >
                                                            Trending
                                                        </label>
                                                    </div>
                                                    <div className="mb-1 pt-0">
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-black-600  uppercase last:mr-0 mr-1">
                                                            Category
                                                        </span>
                                                        <Controller
                                                            name="category"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field: { onChange, onBlur, value } }) => <SelectComponent options={categories} onChange={onChange} value={value} />}
                                                        />

                                                        {/* <ReactSelect
                                                            className="basic-single"
                                                            classNamePrefix="select"
                                                            isClearable
                                                            isSearchable
                                                            name='category'
                                                            // value={value}
                                                            // {...register('category', { required: true })}
                                                            options={categories}
                                                        /> */}

                                                    </div>
                                                    {errors.category && <span className='text-xs font-semibold text-red-500 mb-2' >Category is required</span>}
                                                    <div className="mb-1 pt-0">
                                                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-black-600  uppercase last:mr-0 mr-1">
                                                            Sub Category
                                                        </span>
                                                        <Controller
                                                            name="subcategory"
                                                            control={control}
                                                            rules={{ required: true }}
                                                            render={({ field: { onChange, onBlur, value } }) => <SelectComponent options={subCategories} onChange={onChange} value={value} />}
                                                        />
                                                    </div>
                                                    {errors.subcategory && <span className='text-xs font-semibold text-red-500 mb-2' >Sub Category is required</span>}


                                                </> : "Are you sure you want to delete this sub category ?"
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
                                                openedModal === "edit" ? "Save" : openedModal == "add" ? "Add Image" : "Delete Image"
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
