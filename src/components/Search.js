import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TextInput, TouchableOpacity, StyleSheet, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { heightPercentageToDP } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/AntDesign";
import List from "react-native-vector-icons/Entypo";
import ScreenNames from "../navigation/ScreenNames";
import colors from "../styles/colors";

export default Search = () => {
    const navigation = useNavigation()
    return (
        <View style={style.touch}>
            <TouchableOpacity style={{ flexDirection: 'row', }} onPress={() => navigation.navigate(ScreenNames.reduxScreen)} >
                <Icon
                    color={colors.grey}
                    style={{ marginLeft: 12, alignSelf: 'baseline' }}
                    name="search1"
                    size={30} />
                <TextInput
                    style={{ backgroundColor: colors.white, marginRight: wp(30) }}
                    placeholder="Search Furniture" />
            </TouchableOpacity>

            <TouchableOpacity style={{}} onPress={() => { navigation.navigate(ScreenNames.APiDummy) }}>
                <List
                    color={colors.grey}
                    style={{ marginRight: 12, alignSelf: 'auto' }}
                    size={30}
                    name="list" />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    touch: {
        border: 1,
        marginTop: hp(3),
        alignSelf: 'center',
        borderRadius: 15,
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: hp(5),
        alignItems: 'center',
        width: hp(40),
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: wp(1),
        marginRight: wp(5),
        marginBottom: hp(2),
        marginLeft: wp(5),
    }
})

