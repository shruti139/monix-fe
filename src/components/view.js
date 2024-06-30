'use client'
import React from 'react'
import Sidebar from './sidebar/sidebar';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('./header/header'), { ssr: false });

function View() {
    // const [open, setOpen] = React.useState(false);
    return (
        <>
            <div className="body bg-white ">
                <Header />
                <Sidebar />
            </div>
            {/* <Header open={open} setOpen={setOpen} /> */}

        </>
    )
}

export default View