import { createSlice } from '@reduxjs/toolkit'
import appConfig from 'configs/app.config'

const initialState = {
    file: "",
}

export const localeSlice = createSlice({
    name: 'uploadFile',
    initialState,
    reducers: {
        setFile: (state, action) => {
            state.file = action.payload
        },
    },
})

export const { setFile } = localeSlice.actions

export default localeSlice.reducer
