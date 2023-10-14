import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    Notification,
    toast,
    Avatar,
    Card,
} from 'components/ui'
import DialogButton from './button'
import SMTPform from './SMTPform'
import AWSS3form from './AWSS3form'
import IMAPform from './IMAPform'
import WhatsappForm from './WhatsappForm'
import TEXTRACTform from './TEXTRACTform'
import axios from 'axios'
import { useSelector } from 'react-redux'
import smtp from './images/smtp.png'
import s3 from './images/s3.jpg'
import drive from './images/drive.jpeg'
import imap from './images/imap.png'
import whatsappIcon from './images/whatsapp.jpeg'
import textract from './images/textract.jpg'
import Switcher from 'components/ui/Switcher'

const Integration = () => {
    const { token } = useSelector((state) => state.auth.session)
    const [data, setData] = useState({
        installed: [
            {
                name: 'SMTP',
                img: smtp,
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.',
                active: true,
            },
            {
                name: 'AWS s3 bucket',
                img: s3,
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.',
                active: true,
            },
            {
                name: 'IMAP',
                img: imap,
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.',
                active: true,
            },
            {
                name: 'Whatsapp',
                img: whatsappIcon,
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.',
                active: true,
            },
            {
                name: 'TEXTRACT',
                img: textract,
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.',
                active: true,
            },
            {
                name: 'Google Drive',
                img: drive,
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.',
                active: true,
            },
        ],
    })
    const value = {
        host: '',
        port: '',
        enc: '',
        password: '',
        email: '',
    }
    const value1 = {
        aws_access_key_id: '',
        aws_secret_access_key: '',
        aws_default_region: '',
        aws_bucket: '',
    }
    const whatsapp = {
        number: '',
    }
    const [qr, setQr] = useState('')
    const [url, setUrl] = useState('')
    const [viewIntegration, setViewIntegration] = useState(false)
    const [intergrationDetails, setIntergrationDetails] = useState({})

    const header = {
        Authorization: `Bearer ${token}`,
    }

    const handleLinkClick = () => {
        window.open(url, '_blank')
    }

    const onViewIntegrationOpen = async (details, installed) => {
        if (details.name === 'Google Drive') {
            const res = await axios.get(
                `${process.env.REACT_APP_URL}connect_account`,
                { headers: header }
            )
            setUrl(res.data.url)
            if (res) {
                handleLinkClick()
            }
        } else {
            setViewIntegration(true)
            setIntergrationDetails({ ...details, installed })
        }
    }

    const onViewIntegrationClose = () => {
        setViewIntegration(false)
    }
    const [active, setActive] = useState([])
    console.log(active,"activeee");

    const getStatus = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}api_status`, {
            headers: header,
        })
        setActive(res.data)
        console.log(res)
    }

    useEffect(() => {
        getStatus()
    }, [])

    const toggle = async (name, val) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_URL}api_status?key=${name}&value=${val}`,
                null,
                { headers: header }
            )
            return res
        } catch (err) {
            return err
        }
    }

    const handleNotificationOnSwitch = (res, name, message) => {
        if (res.status === 200) {
            toast.push(
                <Notification
                    title={`${name} integrated`}
                    type={`success`}
                    duration={4500}
                    style={{ overflowX: 'auto' }}
                >
                    {message}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            return true
        } else {
            toast.push(
                <Notification
                    title={`${name} integration failed`}
                    type={`danger`}
                    duration={4500}
                    style={{ overflowX: 'auto' }}
                >
                    {res.response.data.message}
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            return false
        }
    }

    const handleToggle = async (val, name) => {
        if (val === 0) {
            if (name === 'SMTP') {
                const res = await toggle('smtp', 1)
                const result = handleNotificationOnSwitch(
                    res,
                    name,
                    `${name} Activated`
                )
                if (result) {
                    setActive((prevActive) => [1, ...prevActive.slice(1)])
                }
            } else if (name === 'AWS s3 bucket') {
                const res = await toggle('s3', 1)
                console.log('res=>', res)
                const result = handleNotificationOnSwitch(
                    res,
                    name,
                    `${name} Activated`
                )
                if (result) {
                    setActive((prevActive) => [
                        prevActive[0],
                        1,
                        ...prevActive.slice(2),
                    ])
                }
            } else if (name === 'IMAP') {
                const res = await toggle('imap', 1)
                const result = handleNotificationOnSwitch(
                    res,
                    name,
                    `${name} Activated`
                )
                if (result) {
                    setActive((prevActive) => [
                        ...prevActive.slice(0, 2),
                        1,
                        ...prevActive.slice(3),
                    ])
                }
            } else if (name === 'Whatsapp') {
                const res = await toggle('whatsapp', 1)
                const result = handleNotificationOnSwitch(
                    res,
                    name,
                    `${name} Activated`
                )
                if (result) {
                    setActive((prevActive) => [
                        ...prevActive.slice(0, 3),
                        1,
                        ...prevActive.slice(4),
                    ])
                }
            } else if (name === 'TEXTRACT') {
                const res = await toggle('textract', 1)
                const result = handleNotificationOnSwitch(
                    res,
                    name,
                    `${name} Activated`
                )
                if (result) {
                    setActive((prevActive) => [
                        ...prevActive.slice(0, 4),
                        1,
                        ...prevActive.slice(5),
                    ])
                }
            }
            // else if (name === 'Google Drive') {
            //     setActive((prevActive) => [
            //         ...prevActive.slice(0, 5),
            //         1,
            //         ...prevActive.slice(6),
            //     ])
            //     toggle('drive', 1)
            // }
        } else {
            if (name === 'SMTP') {
                const res = await toggle('smtp', 0)
                const result = handleNotificationOnSwitch(
                    res,
                    name,
                    `${name} De-activated`
                )
                if (result) {
                    setActive((prevActive) => [0, ...prevActive.slice(1)])
                }
            } else if (name === 'AWS s3 bucket') {
                const res = await toggle('s3', 0)
                console.log('res=>', res)
                const result = handleNotificationOnSwitch(
                    res,
                    name,
                    `${name} De-activated`
                )
                if (result) {
                    setActive((prevActive) => [
                        prevActive[0],
                        0,
                        ...prevActive.slice(2),
                    ])
                }
            } else if (name === 'IMAP') {
                const res = await toggle('imap', 0)
                const result = handleNotificationOnSwitch(
                    res,
                    name,
                    `${name} De-activated`
                )
                if (result) {
                    setActive((prevActive) => [
                        ...prevActive.slice(0, 2),
                        0,
                        ...prevActive.slice(3),
                    ])
                }
            } else if (name === 'Whatsapp') {
                const res = await toggle('whatsapp', 0)
                const result = handleNotificationOnSwitch(
                    res,
                    name,
                    `${name} De-activated`
                )
                if (result) {
                    setActive((prevActive) => [
                        ...prevActive.slice(0, 3),
                        0,
                        ...prevActive.slice(4),
                    ])
                }
            } else if (name === 'TEXTRACT') {
                const res = await toggle('textract', 0)
                const result = handleNotificationOnSwitch(
                    res,
                    res.response.data.message,
                    name,
                    `${name} De-activated`
                )
                if (result) {
                    setActive((prevActive) => [
                        ...prevActive.slice(0, 4),
                        0,
                        ...prevActive.slice(5),
                    ])
                }
            }
            // else if (name === 'Google Drive') {
            //     setActive((prevActive) => [
            //         ...prevActive.slice(0, 5),
            //         0,
            //         ...prevActive.slice(6),
            //     ])
            //     toggle('drive', 0)
            // }
        }
    }

    const notification = (name, status, message) => {
        toast.push(
            <Notification
                title={`${name} integrated`}
                type={`${status}`}
                duration={4500}
                style={{ overflowX: 'auto' }}
            >
                {status === 'success' ? (
                    `${name} successfuly integrated`
                ) : (
                    <>{message}</>
                )}
            </Notification>,
            {
                placement: 'top-center',
            }
        )
    }

    const IntegrationConnect = async () => {
        if (intergrationDetails.name === 'SMTP') {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_URL}store_api_config?key=smtp&host=${value.host}&port=${value.port}&enc=${value.enc}&password=${value.password}&email=${value.email}`,
                    null,
                    { headers: header }
                )
                notification(
                    intergrationDetails.name,
                    'success',
                    res.data.message
                )
            } catch (err) {
                notification(
                    intergrationDetails.name,
                    'danger',
                    err.response.data.message
                )
            }
            setViewIntegration(false)
        } else if (intergrationDetails.name === 'IMAP') {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_URL}store_api_config?key=imap&host=${value.host}&port=${value.port}&enc=${value.enc}&password=${value.password}&email=${value.email}`,
                    null,
                    { headers: header }
                )
                notification(
                    intergrationDetails.name,
                    'success',
                    res.data.message
                )
            } catch (err) {
                notification(
                    intergrationDetails.name,
                    'danger',
                    err.response.data.message
                )
            }
            setViewIntegration(false)
        } else if (intergrationDetails.name === 'AWS s3 bucket') {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_URL}store_api_config?key=s3&aws_access_key_id=${value1.aws_access_key_id}&aws_secret_access_key=${value1.aws_secret_access_key}&aws_default_region=${value1.aws_default_region}&aws_bucket=${value1.aws_bucket}`,
                    null,
                    { headers: header }
                )
                notification(
                    intergrationDetails.name,
                    'success',
                    res.data.message
                )
            } catch (err) {
                notification(
                    intergrationDetails.name,
                    'danger',
                    err.response.data.message
                )
            }
            setViewIntegration(false)
        } else if (intergrationDetails.name === 'TEXTRACT') {
            try {
                const res = await axios.post(
                    `${process.env.REACT_APP_URL}store_api_config?key=textract&aws_access_key_id=${value1.aws_access_key_id}&aws_secret_access_key=${value1.aws_secret_access_key}&aws_default_region=${value1.aws_default_region}&aws_bucket=${value1.aws_bucket}`,
                    null,
                    { headers: header }
                )
                notification(
                    intergrationDetails.name,
                    'success',
                    res.data.message
                )
            } catch (err) {
                notification(
                    intergrationDetails.name,
                    'danger',
                    err.response.data.message
                )
            }
            setViewIntegration(false)
        } else if (intergrationDetails.name === 'Whatsapp') {
            try {
                const res = axios.post(
                    `${process.env.REACT_APP_URL}user/update?phone=${whatsapp.number}`,
                    null,
                    { headers: header }
                )
                if (res) {
                    const res1 = await axios.get(
                        `${process.env.REACT_APP_URL}whatsapp_qr`,
                        { headers: header }
                    )
                    setQr(res1.data.data.qrimagelink)
                    notification(
                        intergrationDetails.name,
                        'success',
                        'Whatsapp number updated, please scan the QR code to connect'
                    )
                }
            } catch (err) {
                notification(
                    intergrationDetails.name,
                    'danger',
                    err.response.data.message
                )
            }
        } else if (intergrationDetails.name === 'Google') {
            setViewIntegration(false)
        }
    }

    return (
        <>
            <h5>Installed</h5>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
                {data?.installed?.map((app) => (
                    <Card
                        bodyClass="p-0"
                        key={app.name}
                        footerClass="flex justify-end p-2"
                        footer={
                            <Button
                                variant="plain"
                                size="sm"
                                onClick={() => onViewIntegrationOpen(app, true)}
                            >
                                View Intergration
                            </Button>
                        }
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Avatar
                                        className="bg-transparent dark:bg-transparent"
                                        src={app.img}
                                    />
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6>{app.name}</h6>
                                    </div>
                                </div>
                                {app.name !== 'Google Drive' && (
                                    <Switcher
                                        onChange={(val) =>
                                            handleToggle(val, app.name)
                                        }
                                        checked={
                                            app.name === 'SMTP'
                                                ? active[0]
                                                : app.name === 'AWS s3 bucket'
                                                ? active[1]
                                                : app.name === 'IMAP'
                                                ? active[2]
                                                : app.name === 'Whatsapp'
                                                ? active[3]
                                                : app.name === 'TEXTRACT'
                                                ? active[4]
                                                : null
                                        }
                                    />
                                )}
                            </div>
                            <p className="mt-6">{app.desc}</p>
                        </div>
                    </Card>
                ))}
            </div>
            {/* <div className="mt-10">
                <h5>Available</h5>
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
                    {data?.available?.map((app) => (
                        <Card
                            bodyClass="p-0"
                            key={app.name}
                            footerClass="flex justify-end p-2"
                            footer={
                                <Button
                                    variant="plain"
                                    size="sm"
                                    onClick={() =>
                                        onViewIntegrationOpen(app, false)
                                    }
                                >
                                    View Intergration
                                </Button>
                            }
                        >
                            <div className="p-6">
                                <div className="flex items-center">
                                    <Avatar
                                        className="bg-transparent dark:bg-transparent"
                                        src={app.img}
                                    />
                                    <div className="ltr:ml-2 rtl:mr-2">
                                        <h6>{app.name}</h6>
                                    </div>
                                </div>
                                <p className="mt-6">{app.desc}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </div> */}
            <Dialog
                width={650}
                height={450}
                isOpen={viewIntegration}
                onClose={onViewIntegrationClose}
                onRequestClose={onViewIntegrationClose}
            >
                <div className="flex items-center justify-center">
                    <Avatar
                        className="bg-transparent dark:bg-transparent"
                        src={intergrationDetails.img}
                    />
                    <div className="ltr:ml-3 rtl:mr-3">
                        <h6>{intergrationDetails.name}</h6>
                        {/* <span>{intergrationDetails.type}</span> */}
                    </div>
                </div>
                <div className="max-h-[350px] overflow-auto">
                    {intergrationDetails.name === 'SMTP' && (
                        <SMTPform data={value} />
                    )}
                    {intergrationDetails.name === 'IMAP' && (
                        <IMAPform data={value} />
                    )}
                    {intergrationDetails.name === 'AWS s3 bucket' && (
                        <AWSS3form data={value1} />
                    )}
                    {intergrationDetails.name === 'Whatsapp' && (
                        <WhatsappForm data={whatsapp} />
                    )}
                    {intergrationDetails.name === 'TEXTRACT' && (
                        <TEXTRACTform data={value1} />
                    )}
                    {intergrationDetails.name === 'Google Drive' && <></>}
                    <div className="flex w-[50%] mx-auto justify-between mt-4">
                        <DialogButton onClick={IntegrationConnect}>
                            Connect
                        </DialogButton>
                        <DialogButton onClick={onViewIntegrationClose}>
                            Close
                        </DialogButton>
                    </div>
                    {intergrationDetails.name === 'Whatsapp' && (
                        <div className="flex bg-white shadow-lg m-5 p-5 border-r-4 w-[200px] mx-auto">
                            <img
                                src={qr}
                                alt="QR code"
                                width={200}
                                height={200}
                            />
                        </div>
                    )}
                </div>

                {/* <div className="mt-6">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                        About {intergrationDetails.name}
                    </span>
                    <p className="mt-2 mb-4">
                        Wings medium plunger pot, redeye doppio siphon froth
                        iced. Latte, and, barista cultivar fair trade grinder
                        caramelization spoon. Whipped, grinder to go brewed est
                        single shot half and half. Plunger pot blue mountain et
                        blue mountain grinder carajillo, saucer half and half
                        milk instant strong.
                    </p>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                        Key Features
                    </span>
                    <ul className="list-disc mt-2 ltr:ml-4 rtl:mr-4">
                        <li className="mb-1">
                            Fair trade, cortado con panna, crema foam cinnamon
                            aged.{' '}
                        </li>
                        <li className="mb-1">
                            Mug saucer acerbic, caffeine organic kopi-luwak
                            galão siphon.{' '}
                        </li>
                        <li className="mb-1">
                            To go half and half cultivar single origin ut,
                            french press.{' '}
                        </li>
                        <li className="mb-1">
                            Mocha latte flavour cortado cup kopi-luwak.{' '}
                        </li>
                    </ul>
                </div>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onViewIntegrationClose}
                    >
                        Cancel
                    </Button>
                    {intergrationDetails.installed ? (
                        <Button disabled variant="solid">
                            Installed
                        </Button>
                    ) : (
                        <Button
                            variant="solid"
                            onClick={() => handleInstall(intergrationDetails)}
                            loading={installing}
                        >
                            Install
                        </Button>
                    )}
                </div> */}
            </Dialog>
        </>
    )
}

export default Integration
