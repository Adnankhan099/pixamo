import React from 'react'
import { Button } from 'components/ui'

const DialogButton = (props) => {
    const { children,onClick } = props
    return (
        <div className="flex-wrap inline-flex xl:flex items-end ml-auto lg:items-center gap-2">
            <Button
                onClick={onClick}
                size="sm"
                style={{ backgroundColor: '#5271FF', color: 'white' }}
            >
                {children}
            </Button>
        </div>
    )
}

export default DialogButton
