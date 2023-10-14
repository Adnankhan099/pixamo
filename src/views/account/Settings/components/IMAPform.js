import Input from 'components/ui/Input'
import { HiOutlineUser } from 'react-icons/hi'

const AWSS3form = ({data}) => {
    return (
        <div>
            <div className="my-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                    Host
                </label>
                <Input
                    placeholder="Enter your Host"
                    prefix={<HiOutlineUser className="text-lg" />}
                    onChange={(e) => {
                        data.host = e.target.value
                        
                    }}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Port
                </label>
                <Input
                    placeholder="Enter your Port"
                    prefix={<HiOutlineUser className="text-lg" />}
                    onChange={(e) => {
                        data.port = e.target.value
                        
                    }}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                ENC
                </label>
                <Input
                    placeholder="Enter your ENC"
                    prefix={<HiOutlineUser className="text-lg" />}
                    onChange={(e) => {
                        data.enc = e.target.value
                        
                    }}
                />
            </div>
            <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Password
                </label>
                <Input
                    placeholder="Enter your Password"
                    prefix={<HiOutlineUser className="text-lg" />}
                    onChange={(e) => {
                        data.password = e.target.value
                        
                    }}
                />
            </div>
            <div className="">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Email
                </label>
                <Input
                    placeholder="Enter your Email"
                    prefix={<HiOutlineUser className="text-lg" />}
                    onChange={(e) => {
                        data.email = e.target.value
                        
                    }}
                />
            </div>
        </div>
    )
}

export default AWSS3form
