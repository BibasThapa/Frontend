"use client"
import { configureStore } from "@reduxjs/toolkit"
import {apiSlice} from "@/redux/features/api/apiSlice"
import authSlice from "@/redux/features/auth/authSlice"
export const store = configureStore({
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    devTools: false,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSlice.middleware),
})


const initializeApp = async() =>{
    
   
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch:true}))

}
initializeApp();