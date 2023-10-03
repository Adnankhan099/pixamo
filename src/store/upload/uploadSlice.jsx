import { createSlice } from '@reduxjs/toolkit'
import appConfig from 'configs/app.config'

const initialState = {
    file: "",
    url:""
}

export const localeSlice = createSlice({
    name: 'uploadFile',
    initialState,
    reducers: {
        setFile: (state, action) => {
            state.file = action.payload
        },
        setUrl: (state, action) => {
            state.url = action.payload
        }
    },
})

export const { setFile,setUrl } = localeSlice.actions

export default localeSlice.reducer
