import React, { useState } from 'react'
import { Button } from 'components/ui'
import { toast, Notification } from 'components/ui'
import Form from './form'
import { HiPlusCircle } from 'react-icons/hi'
import axios from 'axios'
import { Drawer } from 'components/ui'
import { useSelector, useDispatch } from 'react-redux'
import { updateProductList } from '../store/dataSlice'

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

    const { token } = useSelector(state => state.auth.session)

    const header = { authorization: `Bearer ${token}` }

    const onDialogOk = async (name, condition, operation) => {
        const conditions = encodeURIComponent(JSON.stringify(condition))
        const operations = encodeURIComponent(JSON.stringify(operation))
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_URL}folder?name=${name}&condition=${conditions}&operation=${operations}`,
                null,
                {
                    headers: header
                }
            );
            const response = await axios.get(`${process.env.REACT_APP_URL}folder`, {
                headers: header,
            })
            toast.push(
                <Notification
                    title={'Successfuly Added'}
                    type="success"
                    duration={4500}
                style={{overflowX: 'auto' }}
                >
                    {res.data.message}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            dispatch(updateProductList(response.data.data))
        } catch (error) {
            toast.push(
                <Notification
                    title={'Error'}
                    type="danger"
                    duration={4500}
                style={{overflowX: 'auto' }}
                >
                    {error.response.data.errors.name[0]}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
        closePanel()
    }

    return (
        <>
            <Button variant="solid" size="sm" icon={<HiPlusCircle />} onClick={openPanel} style={{ backgroundColor: "#5271FF", color: "white" }}>
                Add
            </Button>
            <Drawer
                title="Theme Config"
                isOpen={panelExpand}
                onClose={closePanel}
                onRequestClose={closePanel}
                placement={direction === 'rtl' ? 'left' : 'right'}
                width={375}
            >
                <h5 className="mb-4">Upload your files</h5>
                <Form close={() => { }} save={onDialogOk} />
            </Drawer>
        </>
    )
}

export default SidePanel
