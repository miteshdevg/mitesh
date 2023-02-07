import { useEffect, useState } from "react"
import { FlatList, View, Image, Text, StyleSheet, TouchableOpacity } from "react-native"
import Header from "../components/Header"
import AsyncStorage from '@react-native-async-storage/async-storage';
import string from "../language/string"
import Ico from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyles } from "../styles/styles"
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import mostInterestedFlatlist from "../constant/mostInterestedFlatlist";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../styles/colors";

export default Favorite = () => {
    const [like, setLike] = useState([...mostInterestedFlatlist])
    const [flat, setFlat] = useState([])
    const [check, ischeck] = useState(true)

    const _retrieveData = async () => {
        const val = await AsyncStorage.getItem('user')
        //  console.log("val-", val);
        if (val) {
            const value = JSON.parse(val)
            let temp = [];
            //   console.log("+++++", value);
            temp = like.filter((i) => value.includes(i.id))
            // console.log(temp);
            setFlat(temp);
        }
    }

    const checklike = async (item) => {
        // ischeck((check) => !check)
        console.log("hello");

        console.log("item-=-=-=-", item);
        let array = [];
        array = await AsyncStorage.getItem('user')
        const ar = JSON.parse(array)
        console.log("array==-", ar);
        let temp = [];
        console.log(temp);
        // temp = ar.filter((i) => { i.includes(item.id) })
        if (ar.includes(item.id)) {
            console.log("hello");
            let i = ar.indexOf(item.id);
            ar.splice(i, 1)
            console.log("after -array==-", ar);
            temp = JSON.stringify(ar);
            AsyncStorage.setItem(
                'user', temp
            )
            console.log("hy");
        }
        _retrieveData()

    }

    const isfocus = useIsFocused()
    useEffect(() => {
        //console.log("completed");
        if (isfocus) { _retrieveData() }
        //console.log("notworking");
    }, [isfocus]);

    const render = ({ item, index }) => {
        console.log("item-" + item.name);
        return (
            <View style={style.View}>
                <TouchableOpacity style={style.touchable} onPress={() => checklike(item)}>
                    <Ico name="heart"
                        color={colors.green}
                        size={30} />

                </TouchableOpacity>

                <Image
                    style={style.img}
                    source={item.img} />
                <Text style={style.txt}>{item.name}</Text>
                <Text style={[style.txt, { color: colors.orange }]}>${item.price}</Text>

            </View>
        )
    }
    return (
        <View style={[globalStyles.containor]}>
            {/* <Header
                name={string.Favourite}
                Icon={'heart-outline'}
                color={colors.green}
            /> */}
            <Header
                name={string.Favourite}
                Icon="heart"
                color={colors.green} />
            <FlatList
                data={flat}
                numColumns={2}
                contentContainerStyle={{ paddingLeft: wp(6) }}
                renderItem={render} />
        </View>
    )
}
const style = StyleSheet.create({
    img: {
        width: hp(20),
        height: hp(20),
        borderRadius: 10
    },
    View: {
        marginRight: 10,
        marginTop: hp(2),
        marginBottom: hp(2),
        borderRadius: hp(10)
    },
    txt: {
        marginTop: hp(1)
    },
    touchable: {
        backgroundColor: colors.white,
        //  height: hp(5),
        marginLeft: hp(16.5),
        // width: hp(5),
        borderRadius: hp(5),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 1
    },
})