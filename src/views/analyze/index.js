import React, { useEffect } from 'react'
import ImageZoom from './components/ImageZoom'
import TopHeading from './components/topHeading'
import ExtractedDataPortion from './components/ExtractedDataPortion'
import LineItems from './components/LineItems'
import ButtonGroup from './components/ButtonGroup'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUrl } from 'store/upload/uploadSlice'

const Index = () => {
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(null)
    const [id, setId] = useState([])
    const [defaultId, setDefaultId] = useState()
    const [defaultFolder, setDefaultFolder] = useState()
    const [url, SetUrl] = useState('')
    const extractFunction = () => {
        console.log('Extract')
    }
    const processFunction = () => {
        console.log('Process')
    }
    const unlockFunction = () => {
        console.log('Unlock')
    }
    const confirmFunction = () => {
        console.log('Confirm')
    }

    const buttonData = [
        {
            name: 'Confirm',
            onClick: confirmFunction,
        },
        {
            name: 'Unlock',
            onClick: unlockFunction,
        },
        {
            name: 'Process',
            onClick: processFunction,
        },
        {
            name: 'Extract',
            onClick: extractFunction,
        },
    ]

    const { token } = useSelector((state) => state.auth.session)
    const [option, setOption] = useState([])
    const header = {
        Authorization: `Bearer ${token}`,
    }
    const getFolders = async () => {
        const res = await axios.get(`${process.env.REACT_APP_URL}folder`, {
            headers: header,
        })
        setDefaultId(res.data.data[0].id)
        setOption(
            res.data.data.map((item) => ({ value: item.id, label: item.name }))
        )
    }

    const getFiles = async () => {
        const res = await axios.get(
            `${
                process.env.REACT_APP_URL
            }analyze/pdf?folder_id=${encodeURIComponent(JSON.stringify(id))}`,
            {
                headers: header,
            }
        )
        setDefaultFolder(res.data)
        SetUrl(res.data.url)
        dispatch(setUrl(res.data.url))
    }
    useEffect(() => {
        getFolders()
    }, [])

    useEffect(() => {
        if (defaultId) {
            getFiles()
        }
    }, [defaultId, id])

    useEffect(() => {
        if (selected) {
            console.log(selected)
            setId(selected.map((item) => item.value))
        }
    }, [selected])

    return (
        <div>
            <div className="grid grid-col-1 sm:grid-cols-7">
                <div className="sm:col-span-3 p-4 mx-auto">
                    <ImageZoom
                        defaultFolder={defaultFolder}
                        url={url}
                        setDefaultFolder={setDefaultFolder}
                        folder_id={id}
                        SetUrl={SetUrl}
                    />
                </div>
                <div className="sm:col-span-4 flex flex-col gap-3 mt-4 md:mt-0">
                    <div className="flex items-end justify-between w-[100%] gap-2 lg:gap-0">
                        <TopHeading option={option} setSelected={setSelected} />
                        <ButtonGroup data={buttonData} />
                    </div>
                    <ExtractedDataPortion />
                </div>
            </div>
            <LineItems />
        </div>
    )
}

export default Index
