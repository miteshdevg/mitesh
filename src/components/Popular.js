import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native"
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from "../styles/colors";
import font from "../styles/font";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../navigation/ScreenNames";

export default Popular = ({ item }) => {
    const navigation=useNavigation()
    const{name,price,detail,img}=item.item
    return (
        <TouchableOpacity style={style.view} onPress={()=>navigation.navigate(ScreenNames.Detail,item)}>

            <Image
                style={style.image}
                source={img} />
            <View>
                <Text style={{ fontFamily: font.bold, fontSize: 15 }}>{name}</Text>
                <Text style={{ color: colors.grey, fontSize: 12, fontFamily: font.bold }}>{detail}</Text>
                <Text style={{ color: colors.orange, marginTop: hp(1) }}>${price}</Text>
            </View>

        </TouchableOpacity>
    )
}
const style = StyleSheet.create({
    view: {
        marginTop: hp(2),
        backgroundColor: colors.white,
        height: hp(12),
        width: hp(30),
        marginRight: hp(2),
        borderRadius: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center'

    },
    image: {
       
        backgroundColor: 'grey',
        height: hp(9),
        width: hp(9),
        borderRadius: hp(2)
    }
})