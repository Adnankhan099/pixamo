import React from 'react'
import { Button } from 'components/ui'
import { AiFillDelete } from 'react-icons/ai'
import ProductTableSearch from './ProductTableSearch'
import ProductFilter from './ProductFilter'
import { Link } from 'react-router-dom'
import StaticBackdrop from './dialog'
import { useSelector, useDispatch } from 'react-redux'
import {
    toggleDeleteConfirmation,
    setSelectedProduct,
} from '../store/stateSlice'
import FolderFilter from './folderFilter'

const ProductTableTools = () => {
    const dispatch = useDispatch()
    const { selectedRows } = useSelector(
        (state) => state.salesProductList.state
    )
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            {selectedRows.length > 0 && (
                <div className="block lg:inline-block md:mx-2 md:mb-0 mb-4">
                    <Button
                        block
                        size="sm"
                        style={{ backgroundColor: '#5271FF', color: 'white' }}
                        icon={<AiFillDelete />}
                        onClick={() => {
                            dispatch(toggleDeleteConfirmation(true))
                            dispatch(setSelectedProduct(selectedRows))
                        }}
                    >
                        Delete
                    </Button>
                </div>
            )}
            <ProductTableSearch />
            <FolderFilter />
            {/* <ProductFilter /> */}
            {/* <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link> */}
            <StaticBackdrop />
        </div>
    )
}

export default ProductTableTools
