// // import React from 'react';
// // import { createSlice, createStore } from '@reduxjs/toolkit';
// // import { Provider, useSelector, useDispatch } from 'react-redux';
// // import { View } from 'react-native';

// // const counterSlice = createSlice({
// //     name: 'count',
// //     initialState: {
// //         value: 0
// //     },
// //     reducers: {
// //         increment: state => {
// //             state.value += 1;
// //         },
// //         decrement: state => {
// //             state.value -= 1;
// //         }
// //     }
// // });

// // const store = createStore(counterSlice.reducer);

// // function Counter() {
// //     const value = useSelector(state => state.count.value);
// //     const dispatch = useDispatch();

// //     return (
// //         <View>
// //             <p>{value}</p>
// //             <button onClick={() => dispatch(counterSlice.actions.increment())}>
// //                 Increment
// //             </button>
// //             <button onClick={() => dispatch(counterSlice.actions.decrement())}>
// //                 Decrement
// //             </button>
// //         </View>
// //     );
// // }

// // function Rkt() {
// //     return (
// //         <Provider store={store}>
// //             <Counter />
// //         </Provider>
// //     );
// // }

// // export default Rkt;
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { globalStyles } from '../../styles/styles'
// import { useDispatch, useSelector } from 'react-redux'


// export default function rkt() {
//     const dispatch = useDispatch()

//     // const Coin = () => {
//     // const sd = useSelector((state) => state.counter)
//     //const coin = useSelector((state) => state.counter)
//     console.log("-------", coin);
//     return (
//         <View style={globalStyles.containor}>
//             <Text>{ }</Text>
//         </View>
//     )
// }

// const styles = StyleSheet.create({})
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'

import RTK from '../../components/RTK'
import { stored } from '../reduxRKt/store'



const rkt = () => {
    return (
        <Provider store={stored}>
            <RTK />
        </Provider>
    )
}

export default rkt

const styles = StyleSheet.create({})