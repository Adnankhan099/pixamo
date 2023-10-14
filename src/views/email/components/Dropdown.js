
import React from 'react'
import { Dropdown } from 'components/ui'

const DropdownOption = () => {
    const dropdownItems = [
        { key: 'a', name: 'Preview' },
        { key: 'b', name: 'Delete' },
        { key: 'c', name: 'Change Folder' },
    ]

    const onDropdownItemClick = (eventKey, e) => {
        console.log('Dropdown Item Clicked', eventKey, e)
    }

    const onDropdownClick = (e) => {
        console.log('Dropdown Clicked', e)
    }

    return (
        <div>
            <Dropdown title="" onClick={onDropdownClick}>
                {dropdownItems.map((item) => (
                    <Dropdown.Item
                        onSelect={onDropdownItemClick}
                        eventKey={item.key}
                        key={item.key}
                    >
                        {item.name}
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    )
}

export default DropdownOption

