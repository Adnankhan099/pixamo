import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Input from 'components/ui/Input'
import DialogButton from 'views/email/components/button'
import { toast, Notification } from 'components/ui'
import Upload from '../Upload'
import axios from 'axios'
import { AiOutlineUpload } from 'react-icons/ai'
import { setEmailFile } from 'store/email/emailSlice'

const ProductTable = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth.session)
    const { file } = useSelector((state) => state.email)
    const header = { authorization: `Bearer ${token}` }
    const [email, setEmail] = useState('')
    const [body, setBody] = useState('')
    const handleChange = (e) => setEmail(e.target.value)
    const handleChnageBody = (e) => setBody(e.target.value)

    const handleClickSend = async () => {
        if (email === '' || body === '') {
            toast.push(
                <Notification
                    title={'Invalid input'}
                    type="danger"
                    duration={4500}
                    style={{ overflowX: 'auto' }}
                >
                    Please enter valid email and body
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            return
        }
        const formData = new FormData()
        file.forEach((singleFile, i) => {
            formData.append(`file${i}`, singleFile)
        })
        formData.append('multiple', file.length > 1 ? true : false)
        formData.append('count', file.length)
        try {
            await axios.post(
                `${process.env.REACT_APP_URL}send_mail?to=${email}&text=${body}`,
                formData,
                { headers: header }
            )
            toast.push(
                <Notification
                    title={'Email sent'}
                    type="success"
                    duration={4500}
                    style={{ overflowX: 'auto' }}
                >
                    Email sent to {email} successfully
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            setEmail('')
            setBody('')
            dispatch(setEmailFile([]))
        } catch (err) {
            toast.push(
                <Notification
                    title={'Email sent'}
                    type="danger"
                    duration={4500}
                    style={{ overflowX: 'auto' }}
                >
                    {err.response.data.message}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    const handleClickSync = async () => {
        try {
            await axios.get(`${process.env.REACT_APP_URL}fetch_mail`, {
                headers: header,
            })
            toast.push(
                <Notification
                    title={'Sync mail'}
                    type="success"
                    duration={4500}
                    style={{ overflowX: 'auto' }}
                >
                    Email Sync successfully
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        } catch (err) {
            toast.push(
                <Notification
                    title={'Sync mail'}
                    type="danger"
                    duration={4500}
                    style={{ overflowX: 'auto' }}
                >
                    {err.response.data.message}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <>
            <div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                        Email to
                    </label>
                    <Input
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter Email address"
                    />
                </div>
                <div className="my-4">
                    <Upload
                        children={
                            <DialogButton onClick={(e) => e.preventDefault()}>
                                <div className="flex items-center justify-between">
                                    <AiOutlineUpload /> Add file
                                </div>
                            </DialogButton>
                        }
                    />
                </div>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                        Body
                    </label>
                    <Input
                        value={body}
                        placeholder="Enter Email body"
                        textArea
                        onChange={handleChnageBody}
                    />
                </div>
                <div className="flex justify-between">
                    <DialogButton onClick={handleClickSync}>
                        Sync mail
                    </DialogButton>
                    <DialogButton onClick={handleClickSend}>Send</DialogButton>
                </div>
            </div>
        </>
    )
}

export default ProductTable
