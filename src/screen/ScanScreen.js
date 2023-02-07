import axios from "axios";
import { useEffect, useState } from "react";

import { View, FlatList, ScrollView, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import apiCategory from "../constant/apiCategory";
import ScreenNames from "../navigation/ScreenNames";
import colors from "../styles/colors";
import { globalStyles } from "../styles/styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from "@react-navigation/native";

export default ScanSCreen = () => {
    const [selection, setselection] = useState([])
    const [item, setItem] = useState([])
    const navigation = useNavigation()
    const [loader, setloader] = useState(false)
    const [refreshing, setrefreshing] = useState(false)
    const [limit, setLimit] = useState(0)
    const [status, setStatus] = useState(false)
    const [sel, seTselec] = useState(7)
    const [count, setCount] = useState(0)

    useEffect(() => {
        getItem();
    }, [])
    const getItem = async () => {
        setStatus(true)

        console.log(item, "-=-item");
        await axios.get(`https://dummyjson.com/products?limit=10&skip=${limit}`).then((res) => {
            setCount(res.data.total);
            setStatus(false)
            //console.log(res.data.products.length);
            if (res.data.products.length > 0) {
                setrefreshing(false);
                console.log("items=", { limit }, [...item, ...res.data.products]);
                { limit == 0 ? setItem(res.data.products) : setItem([...item, ...res.data.products]) }
                setLimit(limit + 10);
                setselection(res.data.products)
                setloader(false);
            }
        }).catch(() => {
            setStatus(false)
            setloader(false)
        })
    }

    const pressed = (key) => {
        seTselec(key)
        let tmp = selection.filter((i) => i.category == 'smartphones' && key == 1 || i.category == "fragrances" && key == 2 || i.category == "skincare" && key == 3 || i.category == "groceries" && key == 4 || i.category == "home-decoration" && key == 5)
        setItem(tmp)
        console.log("helo");
        if (key == 7) {
            setItem(selection)
        }
    }

    const RendeCategory = ({ item }) => {

        return (
            <TouchableOpacity
                style={{ borderRadius: 20, flexDirection: 'row', backgroundColor: sel == item.id ? colors.red : colors.white, marginLeft: 10, height: heightPercentageToDP(5), alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}
                onPress={() => { pressed(item.id) }}>
                <Icon
                    style={{ marginLeft: 5 }}
                    name={item.icon}
                    size={20} />
                <Text style={{ marginHorizontal: 4, marginRight: 7, }}>{item.name}</Text>
            </TouchableOpacity >
        )
    }
    const Render = ({ index, item }) => {
        //console.log(item);
        // let img = item.images[1]

        // console.log("-=-==-=-=",item.images[1]);
        return (
            <TouchableOpacity style={{ backgroundColor: colors.white, marginBottom: 10, marginTop: 10, borderRadius: 20, height: heightPercentageToDP(10), width: widthPercentageToDP(90), marginHorizontal: widthPercentageToDP(5), flexDirection: 'row' }}
                onPress={() => {
                    navigation.navigate(ScreenNames.ApiDetailScreen, { item })
                    console.log("inside a touchableopacity");
                }}
            >
                {item.images?.length > 0 ? <Image
                    style={{ alignSelf: 'center', backgroundColor: 'black', width: heightPercentageToDP(10), height: heightPercentageToDP(10) }}
                    source={{ uri: item.images[0] }} /> : ""}
                <View>

                    <Text>{item.title}</Text>
                    <Text style={{ color: colors.orange }}>${item.price}</Text>

                </View>

            </TouchableOpacity>
        )
    }


    const onRefresh = () => {
        setrefreshing(true)

        setLimit(0)
        getItem()
    }
    return (
        <View style={globalStyles.containor}>
            <FlatList
                contentContainerStyle={{ paddingTop: widthPercentageToDP(20), paddingRight: widthPercentageToDP(35), paddingLeft: widthPercentageToDP(5), paddingBottom: widthPercentageToDP(10) }}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                horizontal={true}
                data={apiCategory}
                renderItem={RendeCategory}
                horizontal={true}
            />

            <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                ListFooterComponent={() =>
                    loader ? <ActivityIndicator color={colors.black} style={{ margin: 15 }} /> : null
                }
                contentContainerStyle={{ paddingTop: widthPercentageToDP(1) }}
                data={item}
                onEndReached=
                {() => {
                    if (item.length != count && !status) {
                        setloader(true)
                        getItem()
                    }
                }}
                onEndReachedThreshold={0.01}
                renderItem={Render} />
        </View>
    )
}
const styles = StyleSheet.create({
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
})