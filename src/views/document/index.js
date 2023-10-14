import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ProductTable from './components/ProductTable'
import ProductTableTools from './components/ProductTableTools'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

injectReducer('salesProductList', reducer)

const ProductList = () => {
    const { token } = useSelector((state) => state.auth.session)
    const runOnLoad = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}runjob`, {
            headers: { authorization: `Bearer ${token}` },
        })
    }
    useEffect(() => {
        runOnLoad()
    }, [])
    return (
        <AdaptableCard className="h-full p-4" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Documents</h3>
                <ProductTableTools />
            </div>
            <ProductTable />
        </AdaptableCard>
    )
}

export default ProductList
