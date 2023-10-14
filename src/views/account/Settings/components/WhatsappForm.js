import React from 'react'
import Input from 'components/ui/Input'
import { HiOutlineUser} from 'react-icons/hi'

const WhatsappForm = ({data,set}) => {
    return (
        <div>
            <div className="my-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    Your Number
                </label>
                <Input
                    placeholder="Enter your Whatsapp Number"
                    prefix={<HiOutlineUser className="text-lg" />}
                    value={data.number}
                    onChange={(e) => {
                        set({ ...data, number: e.target.value })
                    }}
                />
            </div>
        </div>
    )
}

export default WhatsappForm
