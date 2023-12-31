import React from 'react'
import DialogButton from './button'

const ButtonGroup = ({ data }) => {
    return (
        <div className="flex flex-col justify-end lg:flex-row gap-3">
            {data.map((item, index) => (
                <DialogButton children={item.name} onClick={item.onClick} />
            ))}
        </div>
    )
}

export default ButtonGroup
