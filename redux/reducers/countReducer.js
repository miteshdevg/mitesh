// // redux/reducers/countReducer.js
// const initialState = {
//     count: 0,

// };

// export default (state = initialState, action) => {
//     switch (action.type) {
//         case 'COUNT_INCRESE':
//             return {
//                 ...state,
//                 count: state.count + 1,
//             };
//         case 'COUNT_DECRESE':
//             return {
//                 ...state,
//                 count: state.count - 1,
//             };
//         case 'numDecreased':
//             return {
//                 ...state,
//                 count: state.count - action.payload,
//             };
//         case 'numIncreased':
//             return {
//                 ...state,
//                 count: state.count + action.payload,
//             };
//         default:
//             return state;
//     }
// };
// // import { createSlice } from '@reduxjs/toolkit'

// // const initialStateValues = {
// //     coin: 0,
// // }

// // export const counterSlice = createSlice({
// //     name: 'counter',
// //     initialState: initialStateValues,
// //     reducers: {
// //         increment: (state) => {
// //             state.coin += 1
// //         },
// //         // decrement: (state) => {
// //         //     state.coin -= 1
// //         // },
// //         // incrementByAmount: (state, action) => {
// //         //     state.coin += action.payload
// //         // },
// //         // decrementByAmount: (state, action) => {
// //         //     state.coin -= action.payload
// //         // }
// //     },
// // })

// // // Action creators are generated for each case reducer function
// // export const {increment} = counterSlice.actions

// // export default counterSlice.reducer