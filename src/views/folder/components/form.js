import React, { useState, useEffect } from 'react'
import { Input } from 'components/ui'
import { AiOutlineFolder } from 'react-icons/ai'
import ConditionsSelect from './select'
import DialogButton from './button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'
import { Select } from 'components/ui'
import DatePicker from 'components/ui/DatePicker'

const Form = (props) => {
    const [folderName, setFolderName] = useState('')
    const [conditions, setConditions] = useState([])
    const [resultantConditions, setResultantConditions] = useState([])
    const [resultantOperations, setResultantOperations] = useState([])
    const [contentValue, setContentValue] = useState('')
    const [date, setDate] = useState('')
    const { token } = useSelector((state) => state.auth.session)
    const [option, setOption] = useState([])
    const [operations, setOperations] = useState([
        {
            value: 'AND',
            label: 'AND',
        },
        {
            value: 'OR',
            label: 'OR',
        },
    ])

    const addCondition = (condition, id, value) => {
        setConditions([
            ...conditions,
            { id: id, condition: condition, value: value },
        ])
    }

    const addResultantCondition = (label, id, value, value1) => {
        const newResultantConditions = resultantConditions.filter(
            (item2) => item2.id !== id
        )
        setResultantConditions([
            ...newResultantConditions,
            {
                id: id,
                condition: value1,
                value: label,
                text:
                    value1 === 'Content'
                        ? contentValue
                        : value1 === 'Date'
                        ? date
                        : null,
            },
        ])
    }

    const addOperation = (e, index) => {
        setResultantOperations((prevResultant) => {
            const updatedResultant = [...prevResultant]
            updatedResultant[index] = e.value
            return updatedResultant
        })
    }

    const removeCondition = (item, i) => {
        return () => {
            const newConditions = conditions.filter(
                (item2) => item2.condition !== item.condition
            )
            setConditions(newConditions)
            const newResultantConditions = resultantConditions.filter(
                (item2) => item2.id !== item.id
            )
            setResultantConditions(newResultantConditions)
            console.log(resultantConditions)
            if (i === 0) {
                setResultantOperations(resultantOperations.slice(1))
            } else {
                setResultantOperations(resultantOperations.slice(0, -1))
            }
        }
    }

    const data = async () => {
        const res = await axios.get(
            `${process.env.REACT_APP_URL}condition/all`,
            { headers: { authorization: `Bearer ${token}` } }
        )
        console.log(res.data.data)
        setOption(
            res.data.data.map((item) => {
                return {
                    id: item.id,
                    label: item.label,
                    value: item.value,
                }
            })
        )
    }

    const setDateValue = (date) => {
        const dateFormat = new Date(date)

        const day = String(dateFormat.getDate()).padStart(2, '0')
        const month = String(dateFormat.getMonth() + 1).padStart(2, '0')
        const year = dateFormat.getFullYear()

        const formattedDate = `${day}-${month}-${year}`

        console.log(formattedDate)

        setDate(formattedDate)
        setResultantConditions(
            resultantConditions.map((item) => {
                if (item.condition === 'Date') {
                    return {
                        ...item,
                        text: formattedDate,
                    }
                }
                return item
            })
        )
    }

    const setValue = (e) => {
        setContentValue(e.target.value)
        setResultantConditions(
            resultantConditions.map((item) => {
                if (item.condition === 'Content') {
                    return {
                        ...item,
                        text: e.target.value,
                    }
                }
                return item
            })
        )
    }
    useEffect(() => {
        data()
    }, [])

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
                <ConditionsSelect
                    setId={addCondition}
                    option={option.filter(
                        (item) =>
                            !conditions
                                .map((item2) => item2.condition)
                                .includes(item.label)
                    )}
                    z
                />
            </div>
            {conditions.length !== 0 && (
                <>
                    {conditions.map((item, i) => (
                        <>
                            <div className="my-4 grid grid-cols-12 items-center bg-slate-100 shadow-md rounded-lg p-2 pr-0">
                                <div className="col-span-11 grid grid-cols-11 items-center">
                                    <div className="col-span-3">
                                        <p className="font-semibold text-lg">
                                            {item.condition}
                                        </p>
                                    </div>
                                    <div className="col-span-8">
                                        <ConditionsSelect
                                            setId={addResultantCondition}
                                            option={item.value.map((item2) => ({
                                                id: item.id,
                                                label: item2,
                                                value: item2,
                                                value1: item.condition,
                                            }))}
                                        />
                                    </div>
                                    {item.condition === 'Content' && (
                                        <div className="col-span-11 mt-3">
                                            <Input
                                                name="contentValue"
                                                type="text"
                                                placeholder="Enter your value"
                                                value={contentValue}
                                                prefix={
                                                    <AiOutlineFolder className="text-lg" />
                                                }
                                                onChange={(e) => setValue(e)}
                                                required
                                            />
                                        </div>
                                    )}
                                    {item.condition === 'Date' && (
                                        <div className="col-span-11 mt-3">
                                            <DatePicker
                                                placeholder="Pick a date"
                                                inputLabel={date}
                                                onChange={setDateValue}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <p
                                        className="font-extrabold text-2xl ml-1"
                                        onClick={removeCondition(item, i)}
                                    >
                                        <AiOutlineClose />
                                    </p>
                                </div>
                            </div>
                            {conditions.length !== i + 1 && (
                                <div className="w-[40%] mx-auto my-3">
                                    <Select
                                        placeholder="AND/OR"
                                        options={operations}
                                        onChange={(e) => addOperation(e, i)}
                                    ></Select>
                                </div>
                            )}
                        </>
                    ))}
                </>
            )}
            <div className="flex mt-4 justify-around">
                <div>
                    <DialogButton
                        children={'Save'}
                        onClick={() => {
                            props.save(
                                folderName,
                                resultantConditions,
                                resultantOperations
                            )
                            setFolderName('')
                            setConditions([])
                            setResultantConditions([])
                            setResultantOperations([])
                            setContentValue('')
                            setDate('')
                        }}
                    />
                </div>
                <div>
                    <DialogButton
                        children={'Cancel'}
                        onClick={() => {
                            props.close()
                            setFolderName('')
                            setConditions([])
                            setResultantConditions([])
                            setResultantOperations([])
                            setContentValue('')
                            setDate('')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Form
