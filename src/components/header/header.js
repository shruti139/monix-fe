'use client'
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function Header() {
    const router = useRouter();

    const userName = useSelector((state) => state.common.userDetails)?.name;
    const handleLogOut = () => {
        localStorage.clear();
        router.push('/login');
    }

    return (
        <>
            <div className="fixed w-full z-30 flex bg-white p-2 items-center justify-center h-16 px-10">
                <div className="logo ml-12 transform ease-in-out duration-500 flex-none h-full flex items-center justify-center capitalize">
                    {userName || "Test"}
                </div>
                <div className="grow h-full flex items-center justify-center"></div>
                <div className="flex-none h-full text-center flex items-center justify-center">
                    <div className="flex space-x-3 items-center px-3">

                        <div className="m-1 hs-dropdown [--trigger:hover] relative inline-flex">
                            <button id="hs-dropdown-hover-event" type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU" alt="profile" className="shadow rounded-full object-cover h-7 w-7" />
                                <div className="hidden md:block text-sm md:text-md text-black capitalize"> {userName || "Test"}</div>

                                <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap={"round"} strokeLinejoin={"round"}><path d="m6 9 6 6 6-6" /></svg>
                            </button>

                            <div className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-[300px] before:h-4 before:absolute before:-top-4 before:start-0 before:w-full" aria-labelledby="hs-dropdown-hover-event">
                                <a onClick={handleLogOut} className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" href="#">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Header;