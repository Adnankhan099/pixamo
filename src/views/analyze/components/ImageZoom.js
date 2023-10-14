import { useState, useEffect } from 'react'
import { Document, Page } from 'react-pdf'
import {
    BsArrowLeftSquareFill,
    BsArrowRightSquareFill,
    BsArrowDownSquareFill,
    BsArrowUpSquareFill,
} from 'react-icons/bs'
import Tooltip from 'components/ui/Tooltip'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setUrl } from 'store/upload/uploadSlice'
import HashLoader from "react-spinners/HashLoader";

function ImageZoom({
    defaultFolder,
    url,
    setDefaultFolder,
    folder_id,
    SetUrl,
}) {
    const dispatch = useDispatch()
    const fileUrl = useSelector((state) => state.upload.url)
    console.log(fileUrl, 'fileleeeee')
    console.log(fileUrl)
    const { token } = useSelector((state) => state.auth.session)
    const [numPages, setNumPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false)
    // const [fileUrl,setFileUrl]
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    const [pageWidth, setPageWidth] = useState('400')
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1300 && window.innerWidth > 1000) {
                setPageWidth('300')
            } else if (window.innerWidth < 1000 && window.innerWidth > 650) {
                setPageWidth('200')
            } else if (window.innerWidth < 650 && window.innerWidth > 500) {
                setPageWidth('500')
            } else {
                setPageWidth('400')
            }
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const onClickNext = async () => {
        setLoading(true)
        const res = await axios.get(
            `${process.env.REACT_APP_URL}analyze/pdf?id=${
                defaultFolder.id
            }&folder_id=${encodeURIComponent(
                JSON.stringify(folder_id)
            )}&type=next`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        setDefaultFolder(res.data)
        SetUrl(res.data.url)
        dispatch(setUrl(res.data.url))
        setLoading(false)
    }
    const onClickBack = async () => {
        setLoading(true)
        const res = await axios.get(
            `${process.env.REACT_APP_URL}analyze/pdf?id=${
                defaultFolder.id
            }&folder_id=${encodeURIComponent(
                JSON.stringify(folder_id)
            )}&type=back`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        setDefaultFolder(res.data)
        SetUrl(res.data.url)
        dispatch(setUrl(res.data.url))
        setLoading(false)
    }

    return (
        <div className="flex">
            {loading ? (
                <HashLoader />
            ) : (
                <>
                    <div>
                        <div className="flex justify-between">
                            <div
                                className="hover:cursor-pointer text-3xl"
                                onClick={onClickBack}
                            >
                                <Tooltip title="Move to previous invoice">
                                    <BsArrowLeftSquareFill />
                                </Tooltip>
                            </div>
                            <div
                                className="hover:cursor-pointer text-3xl"
                                onClick={onClickNext}
                            >
                                <Tooltip title="Move to next invoice">
                                    <BsArrowRightSquareFill />
                                </Tooltip>
                            </div>
                        </div>
                        <div>
                            <p>
                                Page {pageNumber} of {numPages}
                            </p>
                            <Document
                                file={fileUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="flex justify-center items-center"
                            >
                                <Page
                                    pageNumber={pageNumber}
                                    width={pageWidth}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    customTextRenderer={false}
                                />
                            </Document>
                        </div>
                    </div>
                    <div className="my-auto">
                        <div
                            className="hover:cursor-pointer text-3xl"
                            onClick={() => {
                                setPageNumber(
                                    pageNumber === 1 ? numPages : pageNumber - 1
                                )
                            }}
                        >
                            <Tooltip title="Move to previous page">
                                <BsArrowUpSquareFill />
                            </Tooltip>
                        </div>
                        <div
                            className="hover:cursor-pointer text-3xl"
                            onClick={() => {
                                setPageNumber(
                                    pageNumber === numPages ? 1 : pageNumber + 1
                                )
                            }}
                        >
                            <Tooltip title="Move to next page">
                                <BsArrowDownSquareFill />
                            </Tooltip>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ImageZoom
