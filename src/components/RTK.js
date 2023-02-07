import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hasProxies } from 'immer/dist/internal'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { apicalling, arrayPush, decrement, increaments, setloader } from '../screen/reduxRKt/counterslice'
import axios from 'axios'
import { useState } from 'react'



const RTK = () => {
    const { value, array, pages, loader } = useSelector((state) => state.counter)
    const dispatch = useDispatch()
    const [number, setNumber] = useState(1)

    useEffect(() => {
        console.log("heloo");
        dispatch(apicalling(pages, array))
        setNumber(number+1);

        console.log("array -=-===-=-", array);
    }, [])

    // const apicalling = () => async () => {
    //     await axios.get(`https://rickandmortyapi.com/api/character/?page=${pages}`).then((res) => {
    //         // const ar = merge(array, res.data.results)

    //         console.log(pages, "enter in apicalling", res.data.results);
    //         // console.log("123654789", ar);
    //         dispatch(arrayPush({ data: [...array, ...res.data.results], status: 'success' }))
    //     }).catch((e) => {
    //         dispatch(arrayPush({ data: e, status: 'error' }))

    //     })
    // }

    // store.dispatch(changeDay({ type: ACTIVITY, data, }));


    // // Now inside the reducer, you can receive it like this

    // reducers: {
    //     changeDay: (state, action) => {
    //         const { type, data } = action.payload; // You will receive the properties like this

    //     }
    // }

    // console.log("array log-=-=", array);
    const renderItem = ({ item }) => {
        // console.log("items-=-=-=-=-=-=", item);
        return (
            <View style={{ height: heightPercentageToDP(12), width: widthPercentageToDP(90), marginVertical: 5, justifyContent: 'space-between', backgroundColor: colors.white, alignSelf: 'center', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ backgroundColor: colors.black, height: heightPercentageToDP(10), width: widthPercentageToDP(20), borderRadius: 20 }}
                        source={{ uri: item?.image }} />

                    <View>
                        <Text>{item?.name}</Text>
                        <Text style={{ marginTop: 5, color: colors.grey }}>{item?.gender}</Text>
                    </View>
                </View>
                <Text >{item?.species}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}>
            <View style={{ flexDirection: 'row', backgroundColor: 'yellow', alignSelf: 'center', }}>
                <TouchableOpacity style={{ height: heightPercentageToDP(4), width: widthPercentageToDP(4), backgroundColor: 'green', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { dispatch(increaments()) }}>
                    <Text>+</Text>
                </TouchableOpacity>
                <Text>{value}</Text>
                <TouchableOpacity style={{ height: heightPercentageToDP(4), width: widthPercentageToDP(4), backgroundColor: 'green', borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => { dispatch(decrement()) }}>
                    <Text>-</Text>
                </TouchableOpacity>
            </View>
            <View style={{ backgroundColor: 'rgb(237, 235, 251)', flex: 1, marginTop: heightPercentageToDP(4), marginHorizontal: 10, borderTopStartRadius: heightPercentageToDP(2), borderTopEndRadius: heightPercentageToDP(2), alignItems: 'center' }}>
                <FlatList
                    data={array}
                    renderItem={renderItem}
                    onEndReached={() => {
                        // dispatch(setloader())
                        dispatch(apicalling(pages, array))
                    }}
                    ListFooterComponent={
                        loader ? <ActivityIndicator style={{ margin: 15 }} color={colors.grey} /> : null
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default RTK

const styles = StyleSheet.create({})