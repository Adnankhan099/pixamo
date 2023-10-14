import React from 'react'
import { Select } from 'components/ui'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const ConditionsSelect = ({ row, setSelectedFolder, selectedFolder, }) => {
    const [resData, setResData] = React.useState([])
    const [selectedValue, setSelectedValue] = useState(null)
    const { token } = useSelector((state) => state.auth.session)
    const header = { Authorization: `Bearer ${token}` }
    const [option, setOption] = useState([])

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        const list = resData.map((item) => {
            return { value: item.id, label: item.name }
        })
        setOption(list)
    }, [resData])

    const dispatch = useDispatch()

    const getData = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_URL}folder`,
            {
                headers: header,
            }
        )
        setResData(response.data.data)
    }

    useEffect(() => {
        if (row) {
            setSelectedFolder(row.folder_id)
            // dispatch(selectFolder(row.folder_id))
        }
    }, [])

    useEffect(() => {
        const waspa = option.find((item) => item.value === selectedFolder)


        setSelectedValue(waspa)
    }, [selectedFolder, row, option])

    const handleChangeSelect = (value) => {
        setSelectedFolder(value)
    }

    return (
        <div>
            <Select
                placeholder="Please Select"
                options={option}
                onChange={(e) => {
                    console.log('selsect', e.value, row)
                    handleChangeSelect(e.value)
                }}
                value={selectedValue}
            ></Select>
        </div>
    )
}

export default ConditionsSelect
