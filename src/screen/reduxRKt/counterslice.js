import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"

const initialState = {
    value: 0,
    array: [],
    pages: 1,
    loader: false
}

export const counterslice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increaments: (state) => {
            state.value = state.value + 1
        },
        decrement: (state) => {
            state.value = state.value - 1
        },
        arrayPush: (state, actions) => {
            state.loader = true
            console.log("inthe arrray piush method-==-=", actions.payload.data)
            switch (actions.payload.status) {
                case 'success':
                    state.array = actions.payload.data
                    state.pages = state.pages + 1
                    state.loader = false
                    break;
                case 'error':
                    alert(actions.payload.data)
                    break;
                default:
                    break;
            }


        },
        // setloader: (state) => {
          
        // }
    },
})
export const apicalling = (stage, array) => async (dispatch) => {
    // const { value, array, pages, loader } = useSelector((state) => state.counter)
    // const { array } = useSelector((state) => state.counter)
    await axios.get(`https://rickandmortyapi.com/api/character/?page=${stage}`).then((res) => {
        // console.log("-=-===-=-=-=-=-=-=hello inside", ...initialState.array)
        // const ar = merge(array, res.data.results)
        // console.log("enter in apicalling", res.data.results);
        // console.log("123654789", ar);
        dispatch(arrayPush({ data: [...array, ...res.data.results], status: 'success' }))
        console.log("hello inside-=--=-==========-------=", initialState.array)
    }).catch((e) => {
        arrayPush({ data: e, status: 'error' }, console.log("invalid", e))
    })
}

// // Now inside the reducer, you can receive it like this

// reducers: {
//     changeDay: (state, action) => {
//         const { type, data } = action.payload; // You will receive the properties like this

//     }
// }
export const { increaments, decrement, arrayPush, setloader, } = counterslice.actions

export default counterslice.reducer