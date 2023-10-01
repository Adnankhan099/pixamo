import React from 'react'
import { Input } from 'components/ui'
import { AiOutlineFolder } from 'react-icons/ai'
import ConditionsSelect from './select'
import DialogButton from './button'
import { useState } from 'react'

const Form = (props) => {
    const [folderName, setFolderName] = useState('')
    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Folder Name
                </label>
                <Input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={folderName}
                    prefix={<AiOutlineFolder className="text-lg" />}
                    onChange={(e) => setFolderName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Conditions
                </label>
                <ConditionsSelect />
            </div>
            <div className="flex mt-4 justify-around">
                <div>
                    <DialogButton
                        children={'Save'}
                        onClick={() => props.save(folderName)}
                    />
                </div>
                <div>
                    <DialogButton children={'Cancel'} onClick={props.close} />
                </div>
            </div>
        </div>
    )
}

export default Form
