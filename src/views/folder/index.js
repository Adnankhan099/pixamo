import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { AdaptableCard } from 'components/shared'
import ProductTable from './components/ProductTable'
import ProductTableTools from './components/ProductTableTools'
import { useSelector } from 'react-redux'

injectReducer('salesProductList', reducer)


const ProductList = () => {
      const { selectedFolderToAddDoc } = useSelector(
          (state) => state.salesProductList.data
      )

console.log('smallpoc', selectedFolderToAddDoc)

    return (
        <AdaptableCard className="h-full p-4" bodyClass="h-full">
            <div className="lg:flex items-center justify-between mb-4">
                <h3 className="mb-4 lg:mb-0">Folders</h3>
                <ProductTableTools />
            </div>
            <ProductTable />
        </AdaptableCard>
    )
}

export default ProductList
