import React from 'react'
import { Upload } from 'components/ui'
import { FcImageFile } from 'react-icons/fc'

const UploadModal = () => {
    return (
        <div>
            <div>
                <Upload draggable>
                    <div className="my-16 text-center">
                        <div className="text-6xl mb-4 flex justify-center">
                            <FcImageFile />
                        </div>
                        <p className="font-semibold">
                            <span className="text-gray-800 dark:text-white">
                                Drop your image here, or{' '}
                            </span>
                            <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 opacity-60 dark:text-white">
                            Support: jpeg, png, gif
                        </p>
                    </div>
                </Upload>
            </div>
        </div>
    )
}

export default UploadModal
