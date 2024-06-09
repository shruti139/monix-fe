'use client'
import { DataTable, IconEye, IconPhoto, IconX } from '@/helper/imports/Imports'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleRowPerPage } from '../Redux/Features/CommonSlice';
import { ApigetInventory } from '@/api-wrapper/ApiInventory';
import Toast from '@/helper/toast/Toast';

function Products() {
    const dispatch = useDispatch()
    const rowPerPage = useSelector((state) => state.common.rowPerPage);
    const [currentPage, setcurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [openedModal, setOpenedModal] = useState('edit');
    const [selectedProductData, setSelectedProductData] = useState()
    const [tableData, setTableData] = useState([])

    function myFunction() {
        alert('The image could not be loaded.');
    }

    let columns = [
        {
            width: "100px",
            name: "Image",
            selector: (row) => row.productImage,
            cell: (row) => {
                return (<>
                    {
                        row.productImage?.[0] ? <img src={row.productImage?.[0]} className="h-12 rounded-full w-12" alt="Product Image" onerror={myFunction} /> : <IconPhoto />
                    }
                </>)
            },
            className: "p-2"
        },

        {
            width: "250px",
            name: "Product Title",
            selector: (row) => row.productTitle || '-',
            sortable: true,
            cell: (row) => {
                return (
                    <>
                        {row.productTitle?.length > 50 ? row.productTitle?.substring(0, 50) + "..." : row.productTitle}
                    </>)
            }
        },
        {
            width: "250px",
            name: "Description",
            selector: (row) => row.description || '-',
            sortable: true,
            cell: (row) => {
                return (
                    <>
                        {row.description?.length > 50 ? row.description?.substring(0, 50) + "..." : row.description}
                    </>)
            }
        },
        {
            width: "150px",
            name: "Quantity",
            selector: (row) => row.quantity || '-',
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
            cell: (row) => {
                return row.type?.join(", ") || "-";
            }
        },
        {
            name: "Brand",
            selector: (row) => row.brand,
            sortable: true,
            cell: (row) => {
                return row.brand?.join(", ") || "-";
            }
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="flex gap-3">
                    <button
                        className="flex align-middle justify-center h-12 max-h-[35px] w-12 max-w-[35px] rounded-lg bg-[#e4f8e4] hover:shadow-lg hover:shadow-green-500/40"
                        onClick={() => handleOpenModel('show', row)}
                    >
                        <IconEye stroke={1.6} color='#049104' className='flex h-full' />
                    </button>
                </div>
            )
        }
    ]

    const handleList = async (page, perPage) => {
        let data = {
            pageNo: page || 1,
            perPage: perPage || rowPerPage,
        };

        await ApigetInventory(data).
            then((res) => {
                if (res.success) {
                    setTableData(res.data);
                    setcurrentPage(res.currentPageNo);
                    setTotalRecords(res.totalRecords);
                } else {
                    Toast.error(res.message);
                }
            })
            .catch((err) => {
                Toast.error("something went to wrong!!");
            });

    };

    const handleClose = () => {
        setShowModal(false)
    }

    const onSubmit = (data) => {

    }

    const handleOpenModel = (modalType, row) => {
        setShowModal(true);
        setOpenedModal(modalType)
        setSelectedProductData(row)
        // if (modalType === 'edit' || modalType === 'delete') {
        //     setSelectedUserData(row)
        // }
    }

    useEffect(() => {
        handleList();
        dispatch(handleRowPerPage(10))
    }, []);

    return (
        <>
            <div className="content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 h-[100vh]">
                <div className="outer-box">
                    <div className='flex justify-between mb-2'>
                        <h4 className='text-xl font-normal mb-3'>Inventory</h4>
                    </div>

                    <DataTable
                        className=""
                        columns={columns}
                        striped={true}
                        data={tableData}
                        pagination
                        paginationServer
                        paginationPerPage={rowPerPage}
                        onChangeRowsPerPage={(event) => {
                            dispatch(handleRowPerPage(event))
                            handleList(currentPage, event);
                        }}
                        onChangePage={(page) => {
                            handleList(page);
                        }}
                        paginationDefaultPage={currentPage}
                        paginationTotalRows={totalRecords}
                        fixedHeader
                    />
                </div>
            </div>
            {showModal &&
                <>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none "
                    >
                        <div className="relative my-6 mx-3 modal-width">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Product
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 float-right leading-none outline-none focus:outline-none"
                                        onClick={handleClose}
                                    >
                                        <IconX />
                                    </button>
                                </div>
                                {/*body*/}

                                <div class="bg-gray-100 dark:bg-gray-800 py-8">
                                    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                        <div class="flex flex-col md:flex-row -mx-4">
                                            <div class="md:flex-1 px-4">
                                                <div class="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                                    <img class="w-full h-full object-cover" src={selectedProductData?.productImage?.[0]} alt="Product Image" />
                                                </div>

                                            </div>
                                            <div class="md:flex-1 px-4">
                                                <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">{selectedProductData.productTitle}</h2>

                                                <div class="flex mb-2">
                                                    <div class="mr-4">
                                                        <span class="font-bold text-gray-700 dark:text-gray-300">Qunatity: </span>
                                                        <span class="text-gray-600 dark:text-gray-300">{selectedProductData.quantity || '-'}</span>
                                                    </div>
                                                    <div>
                                                        <span class="font-bold text-gray-700 dark:text-gray-300">Brand: </span>
                                                        <span class="text-gray-600 dark:text-gray-300 capitalize">{selectedProductData.brand.join(", ") || '-'}</span>
                                                    </div>
                                                </div>
                                                <div class="my-2">
                                                    <span class="font-bold text-gray-700 dark:text-gray-300">Type: </span>
                                                    <span class="text-gray-600 dark:text-gray-300 capitalize">{selectedProductData.type.join(", ") || '-'}</span>
                                                </div>
                                                <div>
                                                    <span class="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                                                    <p class="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                                        {selectedProductData.description || ''}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </>
            }
        </>
    )
}

export default Products;