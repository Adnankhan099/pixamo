import React from 'react'
import ConditionsSelect from './select'

const TopHeading = () => {
    return (
        <div className="flex gap-4 items-center w-[35%]">
            {/* <label className="text-xl font-bold">Folder</label> */}
            <div className="w-full">
                <ConditionsSelect />
            </div>
        </div>
    )
}

export default TopHeading
