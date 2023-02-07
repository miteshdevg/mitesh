import { FlatList, Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import deviceInfoModule from 'react-native-device-info'
import { globalStyles } from '../../styles/styles'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import Icon from "react-native-vector-icons/AntDesign";
// import { colors } from '../../../s/styles/colors';
import SplashScreen from 'react-native-splash-screen';


const LeaderBoardScreen = () => {
  const [id, setid] = useState(1)
  const leaderList = [
    {
      id: 1,
      name: "Weekly"
    },

    {
      id: 2,
      name: "All Time"
    },

  ]
  const list = [
    {
      number: 1,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100,
      rank: require('../../asset/image/Medal.png')
    },
    {
      number: 2,
      name: 'bheem',
      img: require('../../asset/image/doramon.png'),
      score: 2100,
      rank: require('../../asset/image/Medal1.png')
    },
    {
      number: 3,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100,
      rank: require('../../asset/image/Medal2.png')
    }, {
      number: 4,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100
    }, {
      number: 5,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100
    }, {
      number: 6,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100
    }, {
      number: 7,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100
    }, {
      number: 8,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100
    }, {
      number: 9,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100
    }, {
      number: 10,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100
    }, {
      number: 11,
      name: 'doramon',
      img: require('../../asset/image/doramon.png'),
      score: 2100
    },
  ]
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{ backgroundColor: id == item.id ? 'rgb(132, 121, 218)' : 'rgb(67, 55, 153)', marginHorizontal: wp(2), borderRadius: 10, height: hp(4), width: wp(25), alignItems: 'center', justifyContent: 'center' }}
        onPress={() => { setid(item.id) }}>
        <Text style={{ color: id == item.id ? "white" : 'rgb(177, 173, 205)' }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  useEffect(() => {
    Platform.OS === 'android' ? SplashScreen.hide() : ""
  }, []);

  const renderList = ({ item, index }) => {
    return (
      <View style={{ marginTop: 12, backgroundColor: 'white', height: hp(12), width: wp(90), borderRadius: 20, alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ borderColor: 'lightgrey', borderWidth: 2, height: hp(4), borderRadius: 20, width: hp(4), alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'grey' }}>{index + 1}</Text>
          </View>
          <Image
            source={item.img}
            style={{ height: hp(8), width: hp(8), marginHorizontal: wp(2), borderRadius: 100 }} />
          <View style={{ flexDirection: 'column' }}>
            <Text>{item.name}</Text>
            <Text style={{ color: 'grey' }}>{item.score} Points</Text>

          </View>
        </View>
        <View style={{}}>
          {item.rank ? <Image source={item.rank}
            style={{ height: hp(5), borderRadius: 10, width: wp(9) }} /> : ""}
        </View>
      </View>
    )

  }
  return (
    <View style={[globalStyles.containor, { backgroundColor: 'rgb(96, 77, 215)' }]}>
      <View style={style.view}>

        <Icon name="arrowleft"
          color={colors.white}
          size={30} />
        <Text style={style.txt}>Leaderboard</Text>
      </View>
      <View style={{
        marginTop: hp(2), backgroundColor: 'rgb(67, 55, 153)', height: hp(5), width: wp(60), alignSelf: 'center', borderRadius: hp(2), justifyContent: 'center', alignItems: 'center'
      }}>
        <FlatList
          contentContainerStyle={style.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          horizontal={true}
          data={leaderList}
          renderItem={renderItem}
        />
      </View>
      {/* <View style={{ height: 32, width: 32, backgroundColor: 'rgb(96, 77, 215)', position: 'absolute', transform: [{ rotateZ: '45deg' }], borderRadius: 10,top:hp(20.4),right:hp(29.58),zIndex:1 }}>
      </View> */}
      {/* <View style={{
        height: hp(4.8), width: hp(1), backgroundColor: 'red', position: 'absolute', transform: [{ rotateZ: '45deg' }], borderRadius: 20, top: Platform.OS === 'android' ? "19.19%" : deviceInfoModule.hasNotch() ? "17.5%" : "18.5%",
        right: Platform.OS === 'android' ? "52.5%" : deviceInfoModule.hasNotch() ? "52.5%" : "52.8%", zIndex: 1
        ,
        borderBottomRightRadius: 100
      }}>
      </View> */}
      <View style={{
        height: hp(5), width: hp(4), backgroundColor: 'rgb(96, 77, 215)', position: 'absolute', transform: [{ rotateZ: '250deg' }], borderRadius: 10, top: Platform.OS === 'android' ? "21.1%" : deviceInfoModule.hasNotch() ? "16.7%" : "20.5%",
        right: Platform.OS === 'android' ? "41.5%" : deviceInfoModule.hasNotch() ? "37.5%" : "41.5%", zIndex: 1
        ,
        borderBottomRightRadius: 100
      }}>
      </View>
      <View style={{
        height: hp(4), width: hp(5), backgroundColor: 'rgb(96, 77, 215)', position: 'absolute', transform: [{ rotateZ: '200deg' }], borderRadius: 10, top: Platform.OS === 'android' ? "21.1%" : deviceInfoModule.hasNotch() ? "17.2%" : "20.5%",
        right: Platform.OS === 'android' ? "41.5%" : deviceInfoModule.hasNotch() ? "53.5%" : "41.5%", zIndex: 1
        ,
        borderBottomRightRadius: 100
      }}>

      </View>
      {/* forDOT */}
      <View style={{ backgroundColor: 'rgb(96, 77, 215)', height: hp(1), width: hp(1), alignSelf: 'center', position: 'absolute', right: "49%", top: Platform.OS === 'android' ? "21%" : "20.2%", zIndex: 2, borderRadius: hp(1) }}></View>

      <View style={{ height: hp(5), width: hp('5%'), backgroundColor: 'rgb(237, 235, 251)', position: 'absolute', transform: [{ rotateZ: "45deg" }], borderRadius: hp(2), top: hp(20), right: "45%" }}>
      </View>
      <View style={{ backgroundColor: 'rgb(237, 235, 251)', flex: 1, marginTop: hp(4), marginHorizontal: 10, borderTopStartRadius: hp(2), borderTopEndRadius: hp(2), alignItems: 'center' }}>
        <ImageBackground
          source={require('../../asset/image/Rectangle.png')} />
        <FlatList
          data={list}
          renderItem={renderList}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          style={{ marginTop: 2.9, marginBottom: 5 }}
        />
      </View>

    </View>
  )
}

export default LeaderBoardScreen

const style = StyleSheet.create({
  touchable: {
    // backgroundColor: colors.white,
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
    justifyContent: 'space-between',
    marginHorizontal: hp(3),
    marginRight: hp(15)
  },
  txt: {
    fontFamily: font.bold,
    alignSelf: "center",
    fontSize: 20,
    color: colors.white
  },
  contentContainerStyle: {
    //paddingRight: wp(50), paddingLeft: wp(50), 
    alignSelf: 'center',
    borderRadius: 20,
    // height: 100,
    // width: 100


  }
})