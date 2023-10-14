import { combineReducers } from 'redux'
import theme from './theme/themeSlice'
import auth from './auth'
import base from './base'
import locale from './locale/localeSlice'
import upload from './upload/uploadSlice'
import email from './email/emailSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        base,
        locale,
        upload,
        email,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}

export default rootReducer
