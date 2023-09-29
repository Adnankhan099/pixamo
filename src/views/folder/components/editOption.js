
import React, { useState } from 'react'
import { Button, Dialog } from 'components/ui'
import Form from './form'
import { HiOutlinePencil } from 'react-icons/hi'
import useThemeClass from 'utils/hooks/useThemeClass'

// import UploadModal from './UploadModal'

const EditOption = () => {
    const { textTheme } = useThemeClass()
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }

    return (
        <>
            <span
                className={`cursor-pointer p-2 hover:text-[#5271FF]`}
                onClick={openDialog}
            >
                <HiOutlinePencil />
            </span>
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                bodyOpenClassName="overflow-hidden"
            >
                <h5 className="mb-4">Upload your files</h5>
                <Form close={onDialogClose}/>
            </Dialog>
        </>
    )
}

export default EditOption

