import { configureStore } from "@reduxjs/toolkit";
import productsreducer from "./productslice";
import filterslice from "./filterslice";
import logger from 'redux-logger'

const store=configureStore({
    reducer:{
        products:productsreducer,
        filteroptions:filterslice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})
export default store