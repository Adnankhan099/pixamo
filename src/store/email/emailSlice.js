import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    file: [],
    url:""
}

export const localeSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        setEmailFile: (state, action) => {
            state.file = action.payload
        },
        setUrl: (state, action) => {
            state.url = action.payload
        }
    },
})

export const { setEmailFile,setUrl } = localeSlice.actions

export default localeSlice.reducer
