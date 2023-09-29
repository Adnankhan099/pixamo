import React from 'react'
import { Upload, Button } from 'components/ui'
import { HiOutlineCloudUpload } from 'react-icons/hi'
import { FcImageFile } from 'react-icons/fc'

const UploadModal = () => {
    const onDialogClose = () => {
        console.log('onDialogClose')
    }
    const onDialogOk = () => {
        console.log('onDialogOk')
    }

    return (
        <div>
            <div className="mb-4">
                <Upload>
                    <Button
                        size="sm"
                        style={{ color: 'white', backgroundColor: '#5271FF' }}
                        variant="solid"
                        icon={<HiOutlineCloudUpload />}
                    >
                        Upload your file
                    </Button>
                </Upload>
            </div>
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
