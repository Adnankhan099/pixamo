import React from 'react'

const LineItem = ({ line, code, color, quantity, amount }) => {
    return (
        <div className="flex flex-row justify-between w-[100%] items-center">
            <div
                className={`bg-white extractDiv w-[70%] rounded-md shadow-md px-4 py-2 border-l-2 border-${color} hover:border-l-4 lg:w-[80%]`}
            >
                <label className="text-sm font-bold h-5 truncate">{`${quantity}.${line}-${amount}`}</label>
            </div>
            <div className={`bg-white w-[29%] extractDiv px-4 py-2 rounded-md lg:w-[19%]`}>
                <label className="text-sm font-bold block h-5 truncate">
                    {code ? code : ''}
                </label>
            </div>
        </div>
    )
}

export default LineItem
