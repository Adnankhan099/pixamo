import React from 'react'
import { Button } from 'components/ui'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import ProductTableSearch from './ProductTableSearch'
import ProductFilter from './ProductFilter'
import { Link } from 'react-router-dom'
import StaticBackdrop from './dialog'

const ProductTableTools = () => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
            <ProductTableSearch />
            <ProductFilter />
            <Link
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
                download
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link>
            <StaticBackdrop />
        </div>
    )
}

export default ProductTableTools
