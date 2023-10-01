import React, { useEffect, useState } from 'react'
import { Select } from 'components/ui'
import axios from 'axios'
import { useSelector } from 'react-redux'

const colourOptions = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630' },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
]

const ConditionsSelect = () => {
    const { token } = useSelector((state) => state.auth.session)
    const [option, setOption] = useState([])
    const data = async () => {
        const res = await axios.get(
            `${process.env.REACT_APP_URL}condition/all`,
            { headers: { authorization: `Bearer ${token}` } }
        )
        console.log('res', res)
        setOption(
            res.data.data.map((item) => {
                return {
                    value: item.id,
                    label: item.name,
                }
            })
        )
    }

    useEffect(() => {
        data()
    }, [])

    return (
        <div>
            <Select placeholder="Please Select" options={option}></Select>
        </div>
    )
}

export default ConditionsSelect
