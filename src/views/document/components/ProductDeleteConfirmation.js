import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation, setSelectedRows } from '../store/stateSlice'
import { deleteProduct, getProducts } from '../store/dataSlice'
import axios from 'axios'

const ProductDeleteConfirmation = ({ header }) => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.salesProductList.state.deleteConfirmation
    )
    const selectedProduct = useSelector(
        (state) => state.salesProductList.state.selectedProduct
    )
    const tableData = useSelector(
        (state) => state.salesProductList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const id = encodeURIComponent(
            JSON.stringify(
                Array.isArray(selectedProduct)
                    ? selectedProduct
                    : [selectedProduct]
            )
        )
        const response = await axios.post(
            `https://api.voagstech.com/api/document/delete?id=${id}`,
            null,
            { headers: header }
        )
        if (response) {
            dispatch(getProducts(tableData))
            dispatch(setSelectedRows([]))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={4500}
                style={{overflowX: 'auto' }}
                >
                    Product successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Delete product"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Are you sure you want to delete this product? All record related
                to this product will be deleted as well. This action cannot be
                undone.
            </p>
        </ConfirmDialog>
    )
}

export default ProductDeleteConfirmation
