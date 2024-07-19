'use client'
import { useEffect, useState } from 'react';
import { DataTable, IconPencil, IconTrash, IconUserPlus } from '@/helper/imports/Imports'
import { ApiAddUser, ApiDeleteUser, ApiEditUser, ApiGetUser } from '@/api-wrapper/ApiUser';
import Toast from '@/helper/toast/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { handleRowPerPage, loading } from '../Redux/Features/CommonSlice';
import { ApiGetSubCategories, ApiEditSubCategory, ApiAddSubCategory, ApiDeleteSubCategory } from '@/api-wrapper/ApiSubCategory';
import { SimpleModel } from '@/components/sub-category/Model';
import { ApiGetSuggestion, ApiAddAds, ApiGetAllAds } from '@/api-wrapper/ApiSuggestion';

function Suggestion() {

    const dispatch = useDispatch()
    const rowsPerPage = useSelector((state) => state.common.rowPerPage);


    const [showModal, setShowModal] = useState(false);
    const [openedModal, setOpenedModal] = useState('edit');
    const [selectedUserData, setSelectedUserData] = useState()
    const [adsData, setAdsData] = useState({})
    const [adsApiData, setAdsApiData] = useState({})

    let columns = [

        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Suggestion",
            selector: (row) => row.suggestion,
            sortable: true,
        },

        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-3">


                    <button
                        className="flex align-middle justify-center h-12 max-h-[35px] w-12 max-w-[35px] rounded-lg bg-[#ecd3d3] hover:shadow-lg hover:shadow-red-500/40"
                        onClick={() => handleApiCall(ApiDeleteSubCategory, row._id)}
                    >
                        <IconTrash stroke={1.6} color='red' className='flex h-full' />
                    </button>

                </div>
            )
        }

    ]

    const handleList = async (page, perPage) => {
        let data = {
            pageNo: page || 1,
            perPage: perPage || rowsPerPage,
        };

        await ApiGetAllAds(data).
            then((res) => {
                console.log("🚀 ~ then ~ res:", res)
                setAdsApiData(res);

            })
            .catch((err) => {
                console.log("🚀 ~ handleList ~ err:", err)
                Toast.error("something went to wrong!!");
            });

    };

    const handleClose = () => {
        setShowModal(false)
    }

    const handleApiCall = async (apiFunction, data, data1) => {

        dispatch(loading(true))
        try {
            const res = await apiFunction(data, data1);
            Toast.success(res.message);
            handleList();
            dispatch(loading(false))

        } catch (err) {
            dispatch(loading(false))
            Toast.error("something went to wrong!!");
        } finally {
            dispatch(loading(false))
            setShowModal(false);
        }
    };

    const onSubmit = (data) => {



        handleApiCall(ApiAddAds, adsData);

    }


    const handleOpenModel = (modalType, row) => {
        setShowModal(true);
        setOpenedModal(modalType)
        if (modalType === 'edit' || modalType === 'delete') {
            setSelectedUserData(row)
        }
    }

    useEffect(() => {
        handleList();
        dispatch(handleRowPerPage(10))
    }, []);
    return (
        <>
            {showModal ? (
                <>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    <SimpleModel handleClose={handleClose} onSubmit={onSubmit} openedModal={openedModal} selectedUserData={selectedUserData} showModal={showModal} />
                </>
            ) : null}
            <div className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 h-[100vh]">
                <div className="outer-box">
                    <div className='flex justify-between mb-2'>
                        <h4 className='text-xl font-normal mb-3'>ADS</h4>


                    </div>
                    <div className="mb-1 pt-0">
                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded text-black-600  uppercase last:mr-0 mr-1">
                            Ads Json
                        </span>
                        <div>
                            {JSON.stringify(adsApiData)}
                        </div>
                        <textarea onChange={(e) => setAdsData(e.target.value)} rows={10} placeholder="Enter ads json" className={`px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none w-full `}>

                        </textarea>
                    </div>
                    <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                           onClick={onSubmit}
                                        >Save</button>

                </div>
            </div>
        </>
    )
}

export default Suggestion;