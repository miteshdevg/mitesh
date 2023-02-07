import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";
import colors from "../styles/colors";
import font from "../styles/font";
import ScreenNames from "../navigation/ScreenNames";

export default FlatlistMost = ({ item }) => {
    // console.log(item);
    const navigation = useNavigation()

    return (
        <TouchableOpacity style={style.View}
            onPress={() => navigation.navigate(ScreenNames.Detail, item)}
        >
            <Image source={item.item.img}
                style={style.img}
            />
            <View style={{ justifyContent: 'space-around', flexDirection: 'row', }}>
                <View>
                    <Text style={{ fontFamily: font.bold, fontSize: 15 }}>{item.item.name}</Text>
                    <Text style={{ color: colors.grey, fontSize: 12 }}>{item.item.detail}</Text>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors.green,
                    alignItems: 'center',
                    justifyContent: 'center'
                    , borderRadius: 20,
                    width: hp(4)
                    , height: hp(4),
                }}>
                    <Icon
                        size={15}
                        color={colors.white}
                        name="shopping-outline" />
                </TouchableOpacity>
            </View>
            <Text style={{ color: colors.orange, marginVertical: hp(2), marginLeft: hp(2), fontSize: 15 }}>${item.item.price}</Text>
        </TouchableOpacity>
    )

}
const style = StyleSheet.create({
    View: {
        borderRadius: 10,
        marginTop: wp(5),
        backgroundColor: colors.white,
        width: wp(55),
        height: wp(65),
        marginRight: wp(4)
    },
    img: {
        marginTop: 6,
        alignSelf: 'center',
        height: hp('15%'),
        width: hp('10%'),
        marginBottom: hp(3)
    },
})
