import React from 'react'
import { Select } from 'components/ui'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateProductList } from '../store/dataSlice'

const FolderFilter = () => {
    const dispatch = useDispatch()
    const [option, setOption] = useState([])
    const { token } = useSelector((state) => state.auth.session)
    const header = { Authorization: `Bearer ${token}` }
    const folderList = async () => {
        const response = await axios.get(`${process.env.REACT_APP_URL}folder`, {
            headers: header,
        })
        setOption([
            { value: undefined, label: 'Select Folder' },
            ...response.data.data.map((item) => ({
                value: item.id,
                label: item.name,
            })),
        ])
    }

    const selectedFolder = async (e) => {
        if (e.value === undefined) {
            const response = await axios.get(
                `${process.env.REACT_APP_URL}document`,
                {
                    headers: header,
                }
            )
            return dispatch(updateProductList(response.data.data))
        } else {
            const response = await axios.get(
                `${process.env.REACT_APP_URL}folder/document/${e.value}`,
                { headers: header }
            )
            console.log(response)
            dispatch(updateProductList(response.data))
        }
    }
    useEffect(() => {
        folderList()
    }, [])
    return (
        <div className="w-[40%]">
            <Select
                placeholder="Select Folder"
                options={option}
                onChange={(e) => selectedFolder(e)}
            ></Select>
        </div>
    )
}

export default FolderFilter
