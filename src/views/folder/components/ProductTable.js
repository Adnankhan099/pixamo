import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { DataTable } from 'components/shared'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { setTableData, updateProductList } from '../store/dataSlice'
import { setSelectedProduct } from '../store/stateSlice'
import {
    toggleDeleteConfirmation,
    setSelectedRows,
    addRowItem,
    removeRowItem,
} from '../store/stateSlice'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import cloneDeep from 'lodash/cloneDeep'
import EditOption from './editOption'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ActionColumn = ({ row, header, setGetDataApiFlag }) => {
    const dispatch = useDispatch()
    const onDelete = (row) => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <EditOption
                row={row}
                header={header}
                setGetDataApiFlag={setGetDataApiFlag}
            />
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={() => onDelete(row)}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const ProductTable = () => {
    const { token } = useSelector((state) => state.auth.session)
    const tableRef = useRef(null)
    const data = useSelector((state) => state.salesProductList.data.productList)
    const [getDataApiFlag, setGetDataApiFlag] = useState(true)
    const { selectedRows } = useSelector(
        (state) => state.salesProductList.state
    )
    console.log('selectedRows=>', selectedRows)

    const dispatch = useDispatch()

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesProductList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.salesProductList.data.filterData
    )

    const loading = useSelector((state) => state.salesProductList.data.loading)
    const header = { Authorization: `Bearer ${token}` }

    const getData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_URL}folder`, {
            headers: header,
        })
        dispatch(updateProductList(response.data.data))
    }
    useEffect(() => {
        getData()
    }, [getDataApiFlag])

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => (
                    <Link to={`/document?docName=${props.row.original.id}`}>
                        {props.row.original.name}
                    </Link>
                ),
            },
            {
                header: 'Invoices',
                accessorKey: 'count',
                sortable: true,
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        row={props.row.original}
                        header={header}
                        setGetDataApiFlag={setGetDataApiFlag}
                    />
                ),
            },
        ],
        []
    )

    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked, row) => {
        if (checked) {
            dispatch(addRowItem([row.id]))
        } else {
            dispatch(removeRowItem(row.id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked, rows) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds = []
                originalRows.forEach((row) => {
                    selectedIds.push(row.id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <>
            <DataTable
                ref={tableRef}
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                onCheckBoxChange={onRowSelect}
                onIndeterminateCheckBoxChange={onAllRowSelect}
                selectable
            />
            <ProductDeleteConfirmation header={header} />
        </>
    )
}

export default ProductTable
