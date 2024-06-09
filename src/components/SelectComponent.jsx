"use client"
import React from 'react'
import ReactSelect from 'react-select';
const SelectComponent = React.forwardRef(({ value, options, onChange, register, name }, ref) => {
    console.log("🚀 ~ SelectComponent ~ ref:", ref)
    console.log("🚀 ~ SelectComponent ~ register:", register)
    return (
        <div>
            <ReactSelect
                className="basic-single"
                classNamePrefix="select"
                isClearable
                isSearchable
                ref={ref}
                name={name}
                value={value}
                onChange={onChange}
                options={options}
            />

        </div>
    )
})

export default SelectComponent
