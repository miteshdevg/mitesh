import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, Image, StyleSheet, Text, ScrollView, TouchableOpacity, ImageBackground, Platform, FlatList } from "react-native";
import SplashScreen from 'react-native-splash-screen'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import image from "../asset/image/image";
import colors from "../styles/colors";
import string from "../language/string";
import font from "../styles/font";
import Search from "../components/Search";
import Carousel, { Pagination } from "react-native-snap-carousel";
import data from "../constant/data";
import FlatListData from "../constant/FlatlistData";
import mostInterestedFlatlist from "../constant/mostInterestedFlatlist";
import FlatlistMost from "../components/FlatlistMost";
import PopularData from "../constant/PopularData";
import Popular from "../components/Popular"
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncKeys from "../utils/asyncKeys";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ScreenNames from "../navigation/ScreenNames";



export default HomeScreen = () => {
    const isCarousel = useRef(null);
    const [index, setIndex] = useState(0);
    const [list, setList] = useState([...mostInterestedFlatlist]);
    const [selectedid, setselectedid] = useState([]);
    const [id, setid] = useState(7)
    const [item, setItem] = useState([])
    const [sel, setsel] = useState([...mostInterestedFlatlist]);
    const [img, setImg] = useState('')
    const [gmail, setGmail] = useState({})
    const navigation = useNavigation()

    useEffect(() => {
        getItem();
    }, []);

    const getItem = async () => {
        AsyncStorage.setItem(asyncKeys.check, "homescreen")
        let checker = await AsyncStorage.getItem(asyncKeys.check)
        console.log("checker", checker);
        Platform.OS === 'android' ? SplashScreen.hide() : ""
        let image = [];
        image = await AsyncStorage.getItem(asyncKeys.user)
        let Gmail;
        Gmail = await AsyncStorage.getItem("Gmail")
        console.log("gmail", Gmail);
        setGmail(JSON.parse(Gmail))
        let result = JSON.parse(image)
        let getImg = result.image
        console.log("hello");
        setImg(getImg);
        setItem(result)
        console.log("img-----", image);
    }

    const touaglecheck = (key) => {
        setid(key)
        let temp;
        temp = list.filter((i) => i.type == "armchair" && key == 0 || i.type == "sofa" && key == 1 || i.type == "bed" && key == 2)
        setsel(temp);
        if (key == 7) {
            setsel(list);
            return;
        }
    }

    const Render = ({ index, item }) => {

        return (
            <TouchableOpacity onPress={() => touaglecheck(item.key)}
                style={{ borderRadius: 3, flexDirection: 'row' }
                }>
                <View
                    key={index}
                    style={[style.FlatList, { backgroundColor: id == item.key ? colors.green : "white" }]}>
                    <Icon
                        color={id == item.key ? colors.white : colors.grey}
                        style={{ marginHorizontal: 4, marginLeft: 7 }}
                        name={item.icon}
                        size={20} />
                    <Text style={{ marginHorizontal: 4, marginRight: 7, color: id == item.key ? colors.white : colors.grey }}>{item.txt}</Text>
                </View>
            </TouchableOpacity >
        )
    }
    const Item = ({ item, index }) => {
        return (
            <View key={index}>
                <TouchableOpacity style={{}}>
                    <ImageBackground borderRadius={20}
                        style={{ height: 150, width: 300 }}
                        source={item.image}>
                        <Text style={style.txtSWiper}>{item.txt}
                            <Text style={[style.txtSWiper, { fontSize: wp(5), color: colors.grey }]}>{item.txtSub}</Text></Text>
                        <TouchableOpacity style={{ backgroundColor: colors.green, marginLeft: wp(3), marginTop: wp(3), height: wp(9), justifyContent: 'center', width: wp(30), borderRadius: wp(10) }}>
                            <Text style={{ alignSelf: 'center', color: colors.white }}>{item.btnTxt}</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={style.containor}>
            <ScrollView >
                <View style={style.view}>
                    <Image
                        style={style.img}
                        source={{ uri: img ? img : gmail?.photo }} />
                    <Text style={style.txt}>{string.welcome}<Text style={{ fontFamily: font.bold, color: colors.black }}>{item.name ? item.name : gmail?.givenName}</Text></Text>
                    <TouchableOpacity style={[style.img, { backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', marginRight: wp(5) }]}>
                        <Icon
                            name="bell-badge-outline"
                            color={colors.black}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <Search />
                <Text style={style.offer}>{string.offer}</Text>
                <View style={{ flexBasis: 150, marginTop: wp(3), width: 500 }}>
                    <Carousel
                        layout='default'
                        layoutCardOffset={9}
                        ref={isCarousel}
                        data={data}
                        renderItem={Item}
                        sliderWidth={500}
                        itemWidth={300}
                        activeSlideAlignment='start'
                        loop={true}
                        autoplay={true}
                        onSnapToItem={(index) => setIndex(index)}

                    />
                    <Pagination
                        dotsLength={data.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginBottom: 7,
                            marginHorizontal: -80,
                            marginRight: 50,
                            marginTop: hp(-1.99),
                            alignSelf: 'center',
                            backgroundColor: 'rgba(0, 116, 101,1)'
                        }}
                        inactiveDotStyle={{
                            marginHorizontal: -80,
                            marginRight: 50,
                            borderRadius: 5,
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots={true}
                    />
                    <FlatList
                        contentContainerStyle={{ paddingRight: wp(35), paddingLeft: wp(5) }}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        data={FlatListData}
                        horizontal={true}
                        renderItem={Render}
                        //  extraData={selectedid}
                        keyExtractor={item => item.key}
                    />
                    <View style={[style.view, { justifyContent: 'space-between', marginTop: wp(3), width: '70%' }]}>
                        <Text style={style.childTxt}>{string.most}</Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate(ScreenNames.reduxAPI) }}><Text style={{ color: colors.orange }}>{string.viewall}</Text></TouchableOpacity>

                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        data={sel}
                        horizontal={true}
                        contentContainerStyle={{ paddingRight: wp(35), paddingLeft: wp(5) }}
                        renderItem={(item) => <FlatlistMost item={item} />}
                    />
                    <View style={[style.view, { justifyContent: 'space-between', marginTop: wp(3), width: '70%' }]}>
                        <Text style={style.childTxt}>{string.Popular}</Text>
                        <TouchableOpacity><Text style={{ color: colors.orange }}>{string.viewall}</Text></TouchableOpacity>
                    </View>
                    <FlatList

                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        contentContainerStyle={{ paddingRight: wp(35), paddingLeft: wp(5) }}
                        data={PopularData}
                        horizontal={true}
                        renderItem={(item) => <Popular item={item} />}
                    />

                </View>
            </ScrollView >
        </SafeAreaView >
    )
}

const style = StyleSheet.create({
    containor: {
        flex: 1,
        //  marginLeft: wp(5),
        backgroundColor: colors.background
    },
    wraper: {
        // overflow: 'visible'
    },
    offer: {
        color: colors.black,
        fontFamily: font.bold,
        marginTop: hp(2),
        fontSize: hp(2.5),
        marginLeft: wp(5),
    },
    txt: {
        marginVertical: wp(2),
        color: colors.grey,
        marginRight: wp(45),

    },
    view: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: wp(1),
        marginLeft: wp(5),
    },
    img: {
        alignItems: 'baseline',
        borderRadius: 200,
        alignSelf: 'center',
        height: hp(5),
        width: hp(5),
    },
    txtSWiper: {
        marginTop: wp(4),
        marginLeft: wp(5),
        fontFamily: font.bold,
        color: colors.white,
        fontSize: wp(7)

    },
    FlatList: {
        justifyContent: 'center',
        backgroundColor: colors.white,
        marginRight: wp(5),
        justifyContent: "space-around",
        flexDirection: 'row',
        alignItems: 'center',
        height: wp(7),
        //  width: "auto",
        // width: wp(25),
        borderRadius: wp(2)
    },
    childTxt: {
        fontFamily: font.bold,
        color: colors.black,
        fontSize: 20
    },

})