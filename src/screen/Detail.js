import { StyleSheet, TouchableOpacity, View, Image, Text, ScrollView } from "react-native"
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import People from "react-native-vector-icons/Octicons";
import Ico from "react-native-vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../styles/colors";
import SplashScreen from 'react-native-splash-screen';
import { useNavigation, useRoute } from "@react-navigation/native";
import ScreenNames from "../navigation/ScreenNames";

import AsyncStorage from '@react-native-async-storage/async-storage';
import font from "../styles/font";

import image from "../asset/image/image";
import { Rating, } from 'react-native-ratings';
import string from "../language/string";
import { RFPercentage, RFValue as fontSize } from "react-native-responsive-fontsize";


import { globalStyles } from "../styles/styles";


export let favo = [];
export default detail = () => {
    const route = useRoute();
    const [like, setlike] = useState(false)
    const [count, setCounter] = useState(1)
    const [arrrays, setarrays] = useState([])
    const navigation = useNavigation();

    const { id, img, name, price, description, fav } = route.params.item

    const funs = async () => {
        let checklike = await AsyncStorage.getItem('user')
        let flag = JSON.parse(checklike)
        if (flag.includes(id)) {
            setlike(true)
        }
    }
    useEffect(() => {
        Platform.OS === 'android' ? SplashScreen.hide() : ""
        funs()
    }, []);

    const addcart = async () => {
        //  let product = [];
        let item = {
            itemId: id,
            itemQuelity: count,
            itemPrice: price,
            itemImg: img,
            itemName: name
        }
        console.log("hello");
        let result = await AsyncStorage.getItem('cart');
        // console.log(result);
        let arr = []
        arr = result ? JSON.parse(result) : []
        console.log(arr);
        let i = arr.length
        if (i === 0) {
            arr.push(item)
            let value = JSON.stringify(arr)
            console.log("hel");
            AsyncStorage.setItem('cart', value)
        }
        else {
            //  let tmp = await AsyncStorage.getItem('cart')
            // let array = [];
            //  array = JSON.parse(tmp)
            console.log("arrayFOr checking", arr);
            let number = arr.filter((checking) => {
                if (checking.itemId == id) {
                    return checking
                }
            })
            console.log("numbers==--", number);

            //logic for if object is not available 
            if (number.length === 0) {
                let tmp = await AsyncStorage.getItem('cart')
                let array = [];
                array = JSON.parse(tmp)
                array.push(item)
                console.log("in if condition");
                let store = JSON.stringify(array)
                AsyncStorage.setItem('cart', store)
                              
            }
            else {
                arr.map(i => {
                    if (i.itemId == id) {
                        i.itemQuelity += count;
                    }
                })
                let data = JSON.stringify(arr)
                AsyncStorage.setItem('cart', data)
            }


        }
        let tmp = await AsyncStorage.getItem('cart')
        console.log(tmp, "temp...");
        alert("Add to cart completed")
    }

    const fun = async () => {
        setlike((like) => !like)
        if (!like) {
            let review = await AsyncStorage.getItem('user');
            let arr = []
            arr = review ? JSON.parse(review) : [];
            if (arr == null) {
                arr.push(id)
                console.log(arr);
                let val = JSON.stringify(arr)
                AsyncStorage.setItem('user', val)
                console.log("hell");
            }
            if (!arr.includes(id)) {
                arr.push(id)
                console.log(arr);
                let val = JSON.stringify(arr)
                AsyncStorage.setItem('user', val)
                console.log("hell");
            }
            console.log("RRRR", arr);
        }
        else {
            let review = await AsyncStorage.getItem('user');
            let array = JSON.parse(review);
            let index = array.indexOf(id)
            array.splice(index, 1);
            let value = JSON.stringify(array);
            AsyncStorage.setItem(
                'user', value
            )

        }
    }

    return (
        <View style={style.containor}>
            <View style={style.view}>

                <TouchableOpacity style={style.touchable} onPress={() => navigation.navigate(ScreenNames.home)}>
                    <Icon name="arrowleft"
                        color={colors.black}
                        size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={style.touchable} onPress={() => fun()}>
                    {like ? <Ico name="heart"
                        color={colors.red}
                        size={30} /> :
                        <Ico name="heart-outline"
                            color={colors.black}
                            size={30} />
                    }
                </TouchableOpacity>
            </View>
            <View>
                <Image
                    style={style.mainImg}
                    source={img} />
            </View>
            <View style={[style.view, { marginTop: hp(2) }]}>
                <Text style={style.txt}>{name}</Text>
                <Text style={[style.txt, { color: colors.orange }]}>${price}</Text>
            </View>
            <View style={style.innerView}><People
                name="people"
                size={20}
                color={colors.grey} />
                <Text>314 Seen</Text>
                <Ico
                    name="heart-outline"
                    size={20}
                    color={colors.grey} />
                <Text>298 Liked</Text>
                <View style={style.viewImage}>
                    <Image source={image.bheem}
                        style={style.img} />
                </View>
                <View style={[style.viewImage, { left: wp(80) }]}>
                    <Image source={image.doramon}
                        style={style.img} />
                </View>
            </View>
            <Rating
                imageSize={15}
                style={{ paddingRight: hp(32) }} />
            <Text style={style.txtDescription}>{string.Description}</Text>
            <ScrollView hitSlop={100}>
                <Text style={[style.txtDescription, { color: colors.grey }]}>{description}</Text>
            </ScrollView>
            <View style={{ backgroundColor: colors.white, height: hp(15), paddingTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={[style.innerView, { marginTop: 0 }]} >
                        <TouchableOpacity style={[style.touchAble, { backgroundColor: colors.grey }]}
                            onPress={() => { count > 1 ? setCounter(count - 1) : "" }}>
                            <Text style={{ color: colors.white }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ paddingHorizontal: 8, alignSelf: 'center' }}>{count}</Text>
                        <TouchableOpacity style={style.touchAble} onPress={() => setCounter(count + 1)}>
                            <Text style={{ color: colors.white }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginRight: hp(3), }}>${count * price}</Text>
                </View>
                <TouchableOpacity style={[globalStyles.btn, { flexDirection: "row" }]} onPress={() => { addcart() }}>
                    <Icon
                        color={colors.white}
                        size={20}
                        style={[globalStyles.txtGreenBtn, { paddingRight: 8 }]}
                        name="shoppingcart" />
                    <Text style={[globalStyles.txtGreenBtn]}>{string.cart}</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}
const style = StyleSheet.create({
    containor: {
        backgroundColor: colors.background,
        flex: 1
    },
    viewImage: {
        position: 'absolute',
        top: 25,
        left: wp(75)
    },

    txt: {
        //  fontFamily: font.bold,
        fontSize: fontSize(20)
    },
    txtDescription: {
        marginHorizontal: hp(3),
        fontFamily: font.bold,
        marginTop: hp(2)
    },
    innerView:
    {
        marginTop: hp(2),
        flexDirection: 'row',
        marginLeft: hp(3),
        //  padding: 1,
    },
    view: {
        marginTop: hp(7),
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: hp(3)
    },
    touchable: {
        backgroundColor: colors.white,
        height: hp(5),
        width: hp(5),
        borderRadius: hp(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: hp(4),
        width: hp(4),
        borderRadius: hp(10)
    },
    mainImg: {
        backgroundColor: "green",
        alignSelf: 'center',
        height: hp(40),
        width: hp(40),
        borderRadius: hp(10)
    },
    touchAble: {
        backgroundColor: colors.green,
        height: hp(3),
        width: hp(3),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})

