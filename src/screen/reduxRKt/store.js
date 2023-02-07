import { configureStore } from "@reduxjs/toolkit";
import counterslice from "./counterslice";

export const stored=configureStore({
    reducer:{
        counter:counterslice
    }
})