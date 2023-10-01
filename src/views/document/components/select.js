import React from 'react'
import { Select } from 'components/ui'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { selectFolder } from '../store/dataSlice'

const ConditionsSelect = () => {
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
    const dispatch= useDispatch()

    const getData = async () => {
        const response = await axios.get(`${process.env.REACT_APP_URL}folder`, {
            headers: header,
        })
        setResData(response.data.data)
    }
    useEffect(() => {
        getData()
    }, [])
    
    return (
        <div>
            <Select
                placeholder="Please Select"
                options={option}
                onChange={(e) => dispatch(selectFolder(e.value))}
            ></Select>
        </div>
    )
}

export default ConditionsSelect
