import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { color } from "@rneui/base";
import React, { createContext, useEffect, useState } from "react";
import { View, Image, Text, FlatList, Touchable, TouchableOpacity, Button, ActivityIndicator } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { getInputRangeFromIndexes } from "react-native-snap-carousel";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";
import ProfileData from "../constant/ProfileData";
import ScreenNames from "../navigation/ScreenNames";
import colors from "../styles/colors";
import { globalStyles } from "../styles/styles";
import asyncKeys from "../utils/asyncKeys";



export default ProfileScreen = () => {
    const navigation = useNavigation()
    const [img, setImg] = useState('')
    const [gmail, setGmail] = useState({})
    const [faceBook, setFaceBook] = useState({})
    const [item, setItem] = useState([])
    const [logout, setlogout] = useState(false)

    useEffect(() => {
        getItem()
    }, []);
    const getItem = async () => {
        let image = [];
        image = await AsyncStorage.getItem(asyncKeys.user)
        let Gmail;
        let fb;
        fb = await AsyncStorage.getItem("faceBook")
        console.log("-=-=-=-=-=-",fb);
        Gmail = await AsyncStorage.getItem("Gmail")
        console.log("gmail", Gmail);
        setGmail(JSON.parse(Gmail))
        let result = JSON.parse(image)
        let getImg = result.image
        console.log("hello");
        setImg(getImg);
        setItem(result)
        console.log("img        ", image);

    }
    const Render = ({ item }) => {
        console.log("hello123", item);
        return (<TouchableOpacity style={{ paddingLeft: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, height: heightPercentageToDP(7), alignSelf: 'center', marginBottom: 12, width: widthPercentageToDP(90) }}>
            <Icon
                name={item.icon}
                size={30}
                color={colors.grey} />
            <Text>{item.name}</Text>


        </TouchableOpacity>)
    }
    console.log("hlo img", img);
 
    return (
        <View style={globalStyles.containor}>
            <Header
                name={"Profile"} />
            <Image source={{ uri: img ? img : gmail?.photo }}
                style={{ alignSelf: 'center', marginTop: 20, width: heightPercentageToDP(10), height: heightPercentageToDP(10), borderRadius: heightPercentageToDP(10) }} />
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                <Text style={{ marginTop: 5 }}>{item.firstName ? item.firstName : gmail?.givenName} {item.lastName ? item.lastName : gmail?.familyName}</Text>
                <Text style={{ color: colors.grey, marginTop: 5, marginBottom: 7 }}>{item.email ? item.email : gmail?.email}</Text>
            </View>
            <FlatList
                data={ProfileData}
                renderItem={Render} />
            <TouchableOpacity
                style={{ marginBottom: 20, height: heightPercentageToDP(5), alignSelf: 'center', width: widthPercentageToDP(90) }}
                onPress={async () => {
                    {
                        gmail ? GoogleSignin.signOut().then(async (res) => {
                            console.log("logout response", res)
                            await AsyncStorage.removeItem("Gmail")
                            await AsyncStorage.setItem(asyncKeys.check, 'login')
                            navigation.navigate(ScreenNames.login)

                            setlogout(true)
                        }) :
                            await AsyncStorage.removeItem(asyncKeys.user)
                        await AsyncStorage.setItem(asyncKeys.check, 'login')
                        navigation.navigate(ScreenNames.login)
                        setlogout(true)
                    }
                   
                }}>
                <Text style={{ alignSelf: 'center', color: colors.red }}>logout</Text>
            </TouchableOpacity>
        </View>
    )


}