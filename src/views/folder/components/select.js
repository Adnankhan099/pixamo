import React from 'react'
import { Select } from 'components/ui'

const ConditionsSelect = ({ setId, option }) => {
    return (
        <div>
            <Select
                placeholder="Please Select"
                options={option}
                onChange={(e) => {
                    setId(e.label, e.id, e.value, e.value1)
                }}
            ></Select>
        </div>
    )
}

export default ConditionsSelect
