"use client"
import { route } from '@/helper/route/router';
import * as React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

function Sidebar() {

    const userRole = useSelector((state) => state.common.userDetails)?.role;
    const [nav, setNav] = React.useState([]);
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const pathname = usePathname()
    function openNav() {
        setIsNavOpen(!isNavOpen)
    }

    React.useEffect(() => {

        setNav(route);
    }, [route]);

    return (
        <>
            <aside className={`w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] ${isNavOpen ? "translate-x-0" : "-translate-x-48 translate-x-none"}`}>
                <div className={`max-toolbar  w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B]  absolute top-2 rounded-full h-12 ${isNavOpen ? 'hidden translate-x-0' : "translate-x-24 scale-x-0"}`}>

                    <div className="flex pl-4 items-center space-x-2 ">

                    </div>
                    <div className="flex items-center space-x-3 group bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-500  pl-10 pr-2 py-1 rounded-full text-white  ">
                        <div className="transform ease-in-out duration-300 mr-12">
                            Ebay
                        </div>
                    </div>
                </div>
                <div onClick={openNav} className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white bg-[#1E293B] hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                </div>
                <div className={`max text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)] ${isNavOpen ? "flex" : "hidden"}`}>
                    {
                        nav.map((item) => {
                            return (
                                <>
                                    <div key={`${item.path}_${item.id}`} className={`hover:mx-2 hover:bg-white ${pathname === item.path ? 'bg-white text-black' : 'bg-[#1E293B] text-white'} w-[90]  hover:text-black bg-[#1E293B] p-2 pl-8 rounded-l-lg transform ease-in-out duration-300 flex flex-row items-center `}>
                                        {/* <div className="hover:ml-4 justify-end  text-white hover:text-black w-full hover:bg-white bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
                                        </div> */}
                                        <Link href={item.path} className='flex gap-4'>
                                            {item.icon}
                                            {item.name}
                                        </Link>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
                <div className={`mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)] ${isNavOpen ? "hidden" : "flex"}`}>
                    {
                        nav.map((item, index) => {
                            return (
                                <Link href={item.path} key={`${item.name}_${index}`}>
                                    <div className={`hover:ml-4 justify-end  ${pathname == item.path ? 'bg-white text-black' : ' bg-[#1E293B] text-white'} hover:text-black w-full hover:bg-white  p-3 rounded-full transform ease-in-out duration-300 flex`}>
                                        {item.icon}
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
            </aside>
        </>
    )
}

export default Sidebar;