import React from 'react'
import {
    Input,
    Avatar,
    Upload,
    Button,
    Select,
    Switcher,
    Notification,
    toast,
    FormContainer,
} from 'components/ui'
import FormDesription from './FormDesription'
import { setUser } from 'store/auth/userSlice'
import FormRow from './FormRow'
import { Field, Form, Formik } from 'formik'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineBriefcase,
    HiOutlineUser,
} from 'react-icons/hi'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('User Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    title: Yup.string(),
    avatar: Yup.string(),
})

const Profile = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth.session)
    const { userName, email, avatar, title } = useSelector(
        (state) => state.auth.user
    )
    const data = {
        name: userName,
        email: email,
        avatar: avatar,
        title: title,
    }
    const onSetFormFile = (form, field, files) => {
        form.setFieldValue(field.name, files[0])
    }

    const onFormSubmit = async (values, setSubmitting) => {
        const formData = new FormData()

        formData.append('userName', values.name)
        formData.append('email', values.email)
        formData.append('title', values.title)

        // Check if values.avatar is a file object
        if (values.avatar instanceof File) {
            formData.append('avatar', values.avatar)
        }
        const header = {
            Authorization: `Bearer ${token}`,
        }
        const res = await axios.post(
            `${process.env.REACT_APP_URL}user/update`,
            formData,
            { headers: header }
        )
        if (res) dispatch(setUser(res.data.user))
        toast.push(<Notification title={'Profile updated'} type="success" />, {
            placement: 'top-center',
        })
        setSubmitting(false)
    }

    return (
        <Formik
            initialValues={data}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                setTimeout(() => {
                    onFormSubmit(values, setSubmitting)
                }, 1000)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form>
                        <FormContainer>
                            <FormDesription
                                title="General"
                                desc="Basic info, like your name and address that will displayed in public"
                            />
                            <FormRow
                                name="userName"
                                label="Name"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder="Name"
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="email"
                                label="Email"
                                {...validatorProps}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                    prefix={
                                        <HiOutlineMail className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="avatar"
                                label="Avatar"
                                {...validatorProps}
                            >
                                <Field name="avatar">
                                    {({ field, form }) => {
                                        const avatarProps = field.value
                                            ? { src: field.value }
                                            : {}
                                        return (
                                            <Upload
                                                className="cursor-pointer"
                                                onChange={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                showList={false}
                                                uploadLimit={1}
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={60}
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>
                            <FormRow
                                name="title"
                                label="Title"
                                {...validatorProps}
                                border={false}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="title"
                                    placeholder="Title"
                                    component={Input}
                                    prefix={
                                        <HiOutlineBriefcase className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <div className="mt-4 ltr:text-right">
                                {/* <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    type="button"
                                    onClick={resetForm}
                                >
                                    Reset
                                </Button> */}
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 'Updating' : 'Update'}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
