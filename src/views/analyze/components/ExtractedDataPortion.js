import React from 'react'
import ExtractedDataTag from './ExtractedDataTag'
import { useSelector } from 'react-redux'

const ExtractedDataPortion = () => {
    const mode = useSelector((state) => state.theme.mode)
    const extractedData = [
        {
            heading: 'Invoice Number',
            value: '1aaaaaaaaaaa1aaaaaaaaaaa1aaaaaaaaaaa',
            color: 'green-500',
        },
        { heading: 'Total amount', value: '1', color: 'green-500' },
        { heading: 'Total net', value: '1', color: 'green-500' },
        { heading: 'Date', value: '1', color: 'green-500' },
        { heading: 'Due Date', value: '1', color: 'green-500' },
        { heading: 'Supplier', value: '1', color: 'green-500' },
        { heading: 'Supplier Address', value: '1', color: 'green-500' },
        { heading: 'Supplier Registration', value: '1', color: 'green-500' },
        { heading: 'Payment Details', value: '1', color: 'green-500' },
        { heading: 'Customer', value: '1', color: 'green-500' },
        { heading: 'Customer Address', value: '1', color: 'green-500' },
        { heading: 'Customer Registration', value: '1', color: 'green-500' },
        { heading: 'Language', value: '', color: 'green-500' },
        { heading: 'Orientation(degree)', value: '1', color: 'green-500' },
        { heading: 'Currency', value: '1', color: 'green-500' },
        { heading: 'Taxes', value: '1', color: 'green-500' },
        { heading: 'PO #', value: '1', color: 'green-500' },
    ]
    return (
        <div>
            <label className="text-lg font-bold">Extracted Data</label>
            <div
                className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 extractPortion rounded-md shadow-lg px-6 py-4`}
            >
                {extractedData.map((data, index) => (
                    <ExtractedDataTag
                        mode={mode}
                        heading={data.heading}
                        Value={data.value}
                        index={index}
                        color={data.color}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExtractedDataPortion
