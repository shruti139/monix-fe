"use client"
import React from 'react'
import ReactSelect from 'react-select';
const SelectComponent = ({ value, options, onChange, register, name }) => {
    return (
        <div>
            <ReactSelect
                className="basic-single"
                classNamePrefix="select"
                isClearable
                isSearchable
                name={name}
                value={value}
                onChange={onChange}
                options={options}
            />

        </div>
    )
}

export default SelectComponent
