import React from 'react'

const ExtractedDataTag = ({ mode, extractData, setExtractData }) => {
    return (
        <>
            {extractData &&
                extractData.map((item, i) => (
                    <div
                        className={`lg:${
                            i === 7 ? 'col-span-2' : 'col-span-1'
                        }`}
                    >
                        <label className="text-sm font-bold truncate">
                            {item.heading}
                        </label>
                        <div
                            className={`bg-white extractDiv rounded-md shadow-md px-4 py-2 mt-0.5 border-l-2 border-${item.color} hover:border-l-4`}
                        >
                            <input
                                className="text-sm font-bold block h-5 truncate outline-none"
                                value={item.value || ''}
                                onChange={(e) => {
                                    const newArr = [...extractData]
                                    newArr[i].value = e.target.value
                                    setExtractData(newArr)
                                }}
                            />
                        </div>
                    </div>
                ))}
        </>
    )
}

export default ExtractedDataTag
