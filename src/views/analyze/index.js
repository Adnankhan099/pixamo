import React from 'react'
import ImageZoom from './components/ImageZoom'
import TopHeading from './components/topHeading'
import ExtractedDataPortion from './components/ExtractedDataPortion'
import LineItems from './components/LineItems'
import ButtonGroup from './components/ButtonGroup'

const index = () => {
    const extractFunction = () => {
        console.log('Extract')
    }
    const processFunction = () => {
        console.log('Process')
    }
    const unlockFunction = () => {
        console.log('Unlock')
    }
    const confirmFunction = () => {
        console.log('Confirm')
    }

    const buttonData = [
        {
            name: 'Confirm',
            onClick: confirmFunction,
        },
        {
            name: 'Unlock',
            onClick: unlockFunction,
        },
        {
            name: 'Process',
            onClick: processFunction,
        },
        {
            name: 'Extract',
            onClick: extractFunction,
        },
    ]
    return (
        <div>
            <div className="grid grid-col-1 sm:grid-cols-7">
                <div className="sm:col-span-3 p-4 mx-auto">
                    <ImageZoom />
                </div>
                <div className="sm:col-span-4 flex flex-col gap-3 mt-4 md:mt-0">
                    <div className="flex justify-between items-center w-[100%]">
                        <TopHeading />
                        <ButtonGroup data={buttonData} />
                    </div>
                    <ExtractedDataPortion />
                </div>
            </div>
            <LineItems />
        </div>
    )
}

export default index
