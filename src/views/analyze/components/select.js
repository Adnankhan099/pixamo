import React from 'react'
import Select from 'components/ui/Select'

const MultiSelection = ({ option, setSelected }) => {
    return (
        <div>
            <Select
                isMulti
                placeholder="Please Select"
                defaultValue={[]}
                options={option}
                onChange={(e) => setSelected(e)}
            />
        </div>
    )
}

export default MultiSelection
