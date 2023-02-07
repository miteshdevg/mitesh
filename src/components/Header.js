import { TouchableOpacity, View, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/AntDesign";
import Ico from "react-native-vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useState } from "react";
import font from "../styles/font";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../navigation/ScreenNames";

export default Header = ({ ...props }) => {
    const [like, setlike] = useState(false);
    const navigation = useNavigation();
    return (<View style={style.view}>
        <TouchableOpacity style={style.touchable} onPress={() => navigation.navigate(ScreenNames.home)} >
            <Icon name="arrowleft"
                color={colors.black}
                size={30} />
        </TouchableOpacity>
        <Text style={style.txt}>{props.name}</Text>
        <TouchableOpacity style={style.touchable} > 
            <Icon
                name={props.Icon}
                size={30}
                color={props.color}
            />
        </TouchableOpacity>
    </View>)
}
const style = StyleSheet.create({
    touchable: {
        backgroundColor: colors.white,
        height: hp(5),
        width: hp(5),
        borderRadius: hp(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    view: {
        marginTop: hp(7),
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: hp(3)
    },
    txt: {
        fontFamily: font.bold,
        alignSelf: "center",
        fontSize: 20
    }
})
