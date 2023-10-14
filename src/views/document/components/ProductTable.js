import React, { useEffect, useMemo, useRef, useCallback } from 'react'
import { DataTable } from 'components/shared'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { setTableData, updateProductList } from '../store/dataSlice'
import {
    setSelectedProduct,
    setSelectedRows,
    addRowItem,
    removeRowItem,
    toggleDeleteConfirmation,
} from '../store/stateSlice'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import cloneDeep from 'lodash/cloneDeep'
import EditOption from './editOption'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const ActionColumn = ({ row, header }) => {
    const dispatch = useDispatch()
    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row.id))
    }

    return (
        <div className="flex justify-end text-lg">
            <EditOption row={row} header={header} />
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const ProductTable = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth.session)
    const tableRef = useRef(null)
    const data = useSelector((state) => state.salesProductList.data.productList)
    const { search } = useLocation()
    const searchParams = new URLSearchParams(search)
    const docName = searchParams.get('docName')

    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesProductList.data.tableData
    )

    const filterData = useSelector(
        (state) => state.salesProductList.data.filterData
    )

    const loading = useSelector((state) => state.salesProductList.data.loading)
    const header = { authorization: `Bearer ${token}` }

    const getData = async () => {
        if (docName !== null) {
            const response = await axios.get(
                `${process.env.REACT_APP_URL}folder/document/${docName}`,
                { headers: header }
            )
            dispatch(updateProductList(response.data))
            return
        }
        const response = await axios.get(
            `${process.env.REACT_APP_URL}document`,
            { headers: header }
        )
        dispatch(updateProductList(response.data.data))
    }

    useEffect(() => {
        if (tableRef) {
            tableRef.current.resetSorting()
        }
    }, [filterData])

    useEffect(() => {
        getData()
    }, [])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const openURLInNewTab = (url) => {
        window.open(url, '_blank')
    }

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const { name, url } = props.row.original
                    return (
                        <div onClick={() => openURLInNewTab(url)}>{name}</div>
                    )
                },
            },
            {
                header: 'Folder',
                accessorKey: 'folder_name',
                sortable: true,
            },
            {
                header: 'Status',
                accessorKey: 'status',
                sortable: true,
            },
            {
                header: 'Date added',
                accessorKey: 'created_at',
                sortable: true,
            },
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn row={props.row.original} header={header} />
                ),
            },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: (props) => {
            //         const { status } = props.row.original
            //         return (
            //             <div className="flex items-center gap-2">
            //                 <Badge
            //                     className={
            //                         inventoryStatusColor[status].dotClass
            //                     }
            //                 />
            //                 <span
            //                     className={`capitalize font-semibold ${inventoryStatusColor[status].textClass}`}
            //                 >
            //                     {inventoryStatusColor[status].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
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
