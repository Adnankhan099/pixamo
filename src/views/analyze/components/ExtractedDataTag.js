import React from 'react'

const ExtractedDataTag = ({ heading, Value, index, color, mode }) => {
    return (
        <div className={`lg:${index === 7 ? 'col-span-2' : 'col-span-1'}`}>
            <label className="text-sm font-bold truncate">{heading}</label>
            <div
                className={`bg-white extractDiv rounded-md shadow-md px-4 py-2 mt-0.5 border-l-2 border-${color} hover:border-l-4`}
            >
                <label className="text-sm font-bold block h-5 truncate">
                    {Value ? Value : ''}
                </label>
            </div>
        </div>
    )
}

export default ExtractedDataTag
