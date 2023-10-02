import React from 'react'
import MultiSelection from './select'

const TopHeading = ({option,setSelected}) => {
    return (
        <div className="flex gap-4 items-center lg:w-[35%] w-[50%]">
            {/* <label className="text-xl font-bold">Folder</label> */}
            <div className="w-full">
                <MultiSelection option={option} setSelected={setSelected}/>
            </div>
        </div>
    )
}

export default TopHeading
