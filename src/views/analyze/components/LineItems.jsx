import React from 'react'
import LineItem from './LineItem'
import { useSelector } from 'react-redux'

const LineItems = () => {
    const mode = useSelector(state => state.theme.mode)
    const lineItemsData = [
        {
            quantity: 1,
            line: "Line 1",
            amount: 1000,
            code: "code 1",
            color: "red-700"
        },
        {
            quantity: 1,
            line: "Line 1",
            amount: 1000,
            code: "code 1",
            color: "red-800"
        },
        {
            quantity: 1,
            line: "Line 1",
            amount: 1000,
            code: "code 1",
            color: "red-900"
        },
        {
            quantity: 1,
            line: "Line 1",
            amount: 1000,
            code: "code 1",
            color: "red-1000"
        },
        {
            quantity: 1,
            line: "Line 1",
            amount: 1000,
            code: "code 1",
            color: "red-500"
        }
    ]
    return (
        <div className={`extractPortion rounded-md shadow-lg mt-4 px-4 py-6`}>
            <label className="text-lg font-bold">Line Items</label>
            <div className="flex flex-col mt-2 gap-1.5">
                {
                    lineItemsData.map((item, index) => (
                        <LineItem key={index} quantity={item.quantity} code={item.code} line={item.line} amount={item.amount} color={item.color} />
                    ))
                }
            </div>
        </div>
    )
}

export default LineItems
