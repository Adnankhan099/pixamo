
import React, { useState } from 'react'
import { Button, Dialog } from 'components/ui'
import Form from './form'
import { HiPlusCircle } from 'react-icons/hi'
// import UploadModal from './UploadModal'

const StaticBackdrop = () => {
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
        <div>
            <Button variant="solid" size="sm" icon={<HiPlusCircle />} onClick={() => openDialog()} style={{ backgroundColor: "#5271FF", color: "white" }}>
                Add Folder
            </Button>
            {/* <Button shape="circle" variant="solid" onClick={() => openDialog()} style={{ backgroundColor: "#5271FF", color: "black" }}>
                Add Folder
            </Button> */}
            <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                bodyOpenClassName="overflow-hidden"
            >
                <h5 className="mb-4">Upload your files</h5>
                <Form close={onDialogClose} />
            </Dialog>
        </div>
    )
}

export default StaticBackdrop

