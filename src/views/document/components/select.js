import React from 'react'
import { Select } from 'components/ui'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { selectFolder } from '../store/dataSlice'
import { useState } from 'react'

const ConditionsSelect = ({row}) => {
    const [resData, setResData] = React.useState([])
    const [selectedValue,setSelectedValue] = useState(null)
    const { token } = useSelector((state) => state.auth.session)
    const header = { Authorization: `Bearer ${token}` }
    const [option,setOption] = useState([])

    useEffect(() => {
        const list = resData.map((item) => {
            return { value: item.id, label: item.name }
        })
        console.log('hellyeah', list)
        setOption(list)
    }, [resData])
 
    const { selectedFolderToAddDoc } = useSelector(
        (state) => state.salesProductList.data
    )
    console.log(selectedFolderToAddDoc)
    const dispatch = useDispatch()

    const getData = async () => {
        const response = await axios.get(`https://api.voagstech.com/api/folder`, {
            headers: header,
        })
        setResData(response.data.data)
    }
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (row) {
            dispatch(selectFolder(row.folder_id))
        }
    }, [])
    
    useEffect(() => {
        // console.log('selectedFolderToAddDoc:', selectedFolderToAddDoc)
        // console.log('row:', row)
        const waspa = option.find(
            (item) => item.value === selectedFolderToAddDoc
        )

        console.log('helloboys', option, waspa)

        setSelectedValue(waspa)
    }, [selectedFolderToAddDoc, row, option])
    

    


    return (
        <div>
            <Select
                placeholder="Please Select"
                options={option}
                onChange={(e) => {
                    console.log('selsect', e.value, row)
                    dispatch(selectFolder(e.value))
                }}
                // value={option.find((item) => item.value === row?.folder_id)}
                value={selectedValue}
            ></Select>
        </div>
    )
}

export default ConditionsSelect
