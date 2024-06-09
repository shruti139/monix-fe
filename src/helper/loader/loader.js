'use client'

import { useSelector } from "react-redux";

const Loader = () => {
    const isLoading = useSelector(state => state.common.isLoading);
    return (
        <>
            {isLoading &&
                <>
                    <div className="h-screen w-full absolute flex items-center justify-center loader-background">
                        <img src="https://www.svgrepo.com/show/70469/loading.svg" alt="Loading icon" className={`w-20 h-20 animate-spin`} />
                    </div>
                </>
            }
        </>
    )
}
export default Loader