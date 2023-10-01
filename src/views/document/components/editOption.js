import React, { useState } from 'react'
import { Button } from 'components/ui'
import { Input } from 'components/ui'
import { GrDocument } from 'react-icons/gr'
import UploadModal from './UploadModal'
import { HiOutlinePencil } from 'react-icons/hi'
import ConditionsSelect from './select'
import axios from 'axios'
import { Drawer } from 'components/ui'
import { useSelector, useDispatch } from 'react-redux'

export const SidePanel = (props) => {
    const dispatch = useDispatch()

    const { className, ...rest } = props

    const [panelExpand, setPanelExpand] = useState(false)

    const direction = useSelector((state) => state.theme.direction)

    const openPanel = () => {
        dispatch(setPanelExpand(true))
    }

    const closePanel = () => {
        dispatch(setPanelExpand(false))
        const bodyClassList = document.body.classList
        if (bodyClassList.contains('drawer-lock-scroll')) {
            bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
        }
    }

    const { token } = useSelector((state) => state.auth.session)
    // const [dialogIsOpen, setIsOpen] = useState(false)
    const [documentName, setDocumentName] = useState('')
    const { selectedFolderToAddDoc } = useSelector(
        (state) => state.salesProductList.data
    )

    // const onDialogClose = (e) => {
    //     console.log('onDialogClose', e)
    //     setIsOpen(false)
    // }
    const header = { authorization: `Bearer ${token}` }

    const onDialogOk = async (name, folder_id) => {
        // console.log('onDialogOk', e)
        const res = await axios.post(
            `${process.env.REACT_APP_URL}document?name=${name}&folder_id=${folder_id}`,
            { headers: header }
        )
        console.log(res)
        // setIsOpen(false)
        if (res) window.location.reload()
    }

    return (
        <>
            <span
                className={`cursor-pointer p-2 hover:text-[#5271FF]`}
                onClick={openPanel}
            >
                <HiOutlinePencil />
            </span>
            <Drawer
                title="Theme Config"
                isOpen={panelExpand}
                onClose={closePanel}
                onRequestClose={closePanel}
                placement={direction === 'rtl' ? 'left' : 'right'}
                width={375}
            >
                <h5 className="mb-4">Upload your files</h5>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Folder Name
                    </label>
                    <ConditionsSelect />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Document Name
                    </label>
                    <Input
                        type="text"
                        placeholder="Document Name"
                        icon={<GrDocument />}
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                    />
                </div>
                <UploadModal />
                <div className="text-right mt-6">
                    {/* <Button
                        size="sm"
                        style={{ color: 'white', backgroundColor: '#5271FF' }}
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                    >
                        Cancel
                    </Button> */}
                    <Button
                        size="sm"
                        style={{ color: 'white', backgroundColor: '#5271FF' }}
                        variant="solid"
                        onClick={() =>
                            onDialogOk(documentName, selectedFolderToAddDoc)
                        }
                    >
                        Okay
                    </Button>
                </div>
            </Drawer>
        </>
    )
}

export default SidePanel
