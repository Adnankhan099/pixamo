import React from 'react'
import { Select } from 'components/ui'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { selectFolder } from '../store/dataSlice'

const ConditionsSelect = ({row}) => {
    const [resData, setResData] = React.useState([])
    const { token } = useSelector((state) => state.auth.session)
    const header = { Authorization: `Bearer ${token}` }
    const option = resData.map((item) => {
        return { value: item.id, label: item.name }
    })
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
            // dispatch(selectFolder(36))
        }
    }, [])

    


    return (
        <div>
            <Select
                placeholder="Please Select"
                options={option}
                onChange={(e) => {
                    console.log("selsect",e.value,row)
                    dispatch(selectFolder(e.value))
                }}
                value={option.find((item) => item.value === row.folder_id)}
            ></Select>
        </div>
    )
}

export default ConditionsSelect
