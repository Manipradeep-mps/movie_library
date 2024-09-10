import { configureStore} from '@reduxjs/toolkit'
import searchReducer from '../src/slices/searchSlice'

const store=configureStore({
    devTools:true,
    reducer:{
         search:searchReducer
    }
})

export default store
