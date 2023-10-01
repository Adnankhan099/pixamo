import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import pdfFile from './Design_Document.pdf'
import {
    AiOutlineArrowDown,
    AiOutlineArrowUp,
    AiOutlineArrowLeft,
    AiOutlineArrowRight,
} from 'react-icons/ai'
import {BsArrowLeftSquareFill,BsArrowRightSquareFill,BsArrowDownSquareFill,BsArrowUpSquareFill } from "react-icons/bs"
import Tooltip from 'components/ui/Tooltip'

function ImageZoom() {
    const [numPages, setNumPages] = useState()
    const [pageNumber, setPageNumber] = useState(1)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
    }

    return (
        <div className="flex">
            <div>
                <div className="flex justify-between">
                    <div
                        className="hover:cursor-pointer text-3xl"
                        onClick={() => {}}
                    >
                        <Tooltip title="Move to previous invoice">
                            <BsArrowLeftSquareFill  />
                        </Tooltip>
                    </div>
                    <div
                        className="hover:cursor-pointer text-3xl"
                        onClick={() => {}}
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
                        file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex justify-center items-center"
                    >
                        <Page
                            pageNumber={pageNumber}
                            width="400"
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
        </div>
    )
}

export default ImageZoom
