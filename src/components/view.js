'use client'
import React from 'react'
import Sidebar from './sidebar/sidebar';
import Header from './header/header';

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