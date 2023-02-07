import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialIcons";
import Btn from "../components/Btn";
import Header from "../components/Header";
import string from "../language/string";
import colors from "../styles/colors";
import font from "../styles/font";
import { globalStyles } from "../styles/styles";




export default Shopping = () => {
    const [array, setArray] = useState([])
    const [price, setPrice] = useState(0);

    const isfocus = useIsFocused()
    useEffect(() => {
        if (isfocus) {
            console.log('hjk');
            getdata()
        }
    }, [isfocus])

    const getdata = async () => {
        let temp = [];
        temp = await AsyncStorage.getItem(asyncKeys.cart);
        let data = JSON.parse(temp);

        let counter = 0;
        setArray(data);

        data.map(i => {
            let tmp;
            console.log("temps", tmp);
            tmp = i.itemPrice * i.itemQuelity
            counter = counter + tmp;

        })
        setPrice(counter);
        console.log("price..log", price);
    }
    const increase = async (item) => {
        let itm = await AsyncStorage.getItem(asyncKeys.cart)
        let del = JSON.parse(itm)
        if (del) {
            del.map(i => {
                if (i.itemId == item.itemId) {
                    i.itemQuelity = i.itemQuelity + 1
                }
            });
            //    console.log(cartList);
            AsyncStorage.setItem('cart', JSON.stringify(del));
            getdata()
        }
    }
    const decrease = async (item) => {
        let itm = await AsyncStorage.getItem(asyncKeys.cart)
        let del = JSON.parse(itm)
        if (del) {
            del.map(i => {
                if (i.itemId == item.itemId) {
                    if (i.itemQuelity >= 2) { i.itemQuelity = i.itemQuelity - 1 }
                }
            });
            //    console.log(cartList);    
            AsyncStorage.setItem('cart', JSON.stringify(del));
            getdata()


        }
    }

    const del = async (item) => {
        let tmp = await AsyncStorage.getItem(asyncKeys.cart)
        let arr = []
        arr = JSON.parse(tmp)
        let list = arr.filter(i => i.itemId !== item.itemId)
        setArray(list)
        AsyncStorage.setItem('cart', JSON.stringify(list))
        getdata()

    }
    const rendertItem = ({ item }) => {
        return (
            <View style={style.flatVew}>
                <View style={{ flexDirection: "row" }}>
                    <Image source={item.itemImg}
                        style={{ height: heightPercentageToDP(8), width: heightPercentageToDP(8) }} />
                    <View style={{ marginRight: 50, }}>
                        <Text>{item.itemName}</Text>
                        <Text style={{ color: colors.orange }}>${parseFloat(item.itemPrice * item.itemQuelity).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>
                    <TouchableOpacity style={[style.touch, { backgroundColor: 'lightgrey' }]} onPress={() => decrease(item)}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <Text>{item.itemQuelity}</Text>
                    <TouchableOpacity style={style.touch} onPress={() => { increase(item) }}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[style.touch, { backgroundColor: colors.background, height: heightPercentageToDP(5), width: heightPercentageToDP(5) }]}
                    onPress={() => { del(item) }}
                >
                    <Icon
                        size={20}
                        color={colors.black}
                        name="delete" />
                </TouchableOpacity>


            </View>
        )
    }

    return (
        <View style={[globalStyles.containor]}>
            <Header
                name={string.Shopping}
                Icon="delete" />
            <ScrollView>
                <FlatList
                    data={array}
                    renderItem={rendertItem}
                />
            </ScrollView>
            <View style={{ backgroundColor: colors.white, height: heightPercentageToDP(30), borderRadius: 10, width: widthPercentageToDP(98), paddingHorizontal: 20 }}>

                <Text style={{ fontFamily: font.bold, fontSize: 20 }}>Order summery</Text>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={{ color: colors.grey }}>Subtotal</Text>
                    <Text style={{ color: colors.orange }}>${parseFloat(price).toFixed(2)}</Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={{ color: colors.grey }}>Shipping cost</Text>
                    <Text style={{ color: colors.orange }}>${parseFloat((price * 20) / 100).toFixed(2)}</Text>
                </View>
                <View style={{ width: widthPercentageToDP(90), backgroundColor: colors.background, height: heightPercentageToDP(1), }}>

                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingTop: 10 }}>
                    <Text style={{ fontFamily: font.bold, fontSize: 20 }}>Total Payment</Text>
                    <Text style={{ color: colors.orange }}>${parseFloat(price + (price * 20) / 100).toFixed(2)}</Text>
                </View>
                <Btn
                    name={"Check Out"} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    flatVew: {
        backgroundColor: "white",
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(90),
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    touch: {
        backgroundColor: colors.green,
        borderRadius: 10,
        alignItems: 'center',
        height: 20,
        width: 20,
        justifyContent: 'center'
    }
})