import { useState } from 'react'
import Input from 'components/ui/Input'
import Tooltip from 'components/ui/Tooltip'
import { HiOutlineUser, HiOutlineExclamationCircle } from 'react-icons/hi'

const AWSS3form = ({ data, set }) => {
    return (
        <div>
            <div className="my-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    AWS Access Key ID
                </label>
                <Input
                    placeholder="Enter your AWS Access Key ID"
                    prefix={<HiOutlineUser className="text-lg" />}
                    value={data.aws_access_key_id}
                    onChange={(e) => {
                        set({ ...data, aws_access_key_id: e.target.value })
                    }}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    AWS Secret Access Key
                </label>
                <Input
                    placeholder="Enter your AWS Secret Access Key"
                    prefix={<HiOutlineUser className="text-lg" />}
                    value={data.aws_secret_access_key}
                    onChange={(e) => {
                        set({ ...data, aws_secret_access_key: e.target.value })
                    }}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    AWS Default Region
                </label>
                <Input
                    placeholder="Enter your AWS Default Region"
                    prefix={<HiOutlineUser className="text-lg" />}
                    value={data.aws_default_region}
                    onChange={(e) => {
                        set({ ...data, aws_default_region: e.target.value })
                    }}
                />
            </div>
            <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    AWS Bucket
                </label>
                <Input
                    placeholder="Enter your AWS Bucket"
                    prefix={<HiOutlineUser className="text-lg" />}
                    value={data.aws_bucket}
                    onChange={(e) => {
                        set({ ...data, aws_bucket: e.target.value })
                    }}
                />
            </div>
        </div>
    )
}

export default AWSS3form
