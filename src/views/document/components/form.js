import React from 'react'
import { Input } from 'components/ui'
import { AiOutlineFolder } from 'react-icons/ai'
import ConditionsSelect from './select'
import DialogButton from './button'

const Form = (props) => {
    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Folder Name
                </label>
                <Input
                    name="folderName"
                    type="text"
                    placeholder="Enter your name"
                    prefix={<AiOutlineFolder className="text-lg" />}
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
                    <DialogButton children={"Save"} onClick={props.close}/>
                </div>
                <div>
                    <DialogButton children={"Cancel"} onClick={props.close}/>
                </div>
            </div>
        </div>
    )
}

export default Form
