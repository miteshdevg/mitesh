import { Image, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import string from '../language/string'
import Onboarding from 'react-native-onboarding-swiper';
import colors from '../styles/colors';
import image from '../asset/image/image';
import ScreenNames from '../navigation/ScreenNames';
import Btn from '../components/Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import asyncKeys from '../utils/asyncKeys';

export default ONBoard = ({ navigation }) => {

    const data = [
        {
            backgroundColor: colors.white,
            image: <Image style={styles.img}
                source={image.firstonboard}
            />,
            subtitle: <Text style={styles.txt}>{string.second1}</Text>,
        },
        {
            backgroundColor: colors.white,
            image: <Image style={styles.img}
                source={image.secondonboard}
            />,
            subtitle: <Text style={styles.txt}>{string.first1}</Text>,
        },
        {
            backgroundColor: colors.white,
            image: <Image style={styles.img}
                source={image.thirdonboard}
            />,
            title: <Text style={styles.txt}>{string.third1}</Text>,
        },
    ]

    useEffect(() => {
        Platform.OS === 'android' ? SplashScreen.hide() : ""
    }, []);

    const Square = ({ isLight, selected }) => {
        let backgroundColor;

        if (isLight) {
            backgroundColor = selected ? colors.activatedDot : colors.dot;
        } else {
            backgroundColor = selected ? colors.white : colors.dotBackground;
        }

        return (
            <View
                style={{
                    width: 6,
                    borderRadius: 10,
                    height: 6,
                    marginHorizontal: 3,
                    backgroundColor,
                    marginBottom: hp(25)
                }}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Onboarding
                pages={data}
                DoneButtonComponent={() => (<Btn
                    name={string.startbtn}
                    touchStyle={{ marginRight: wp(60), marginBottom: wp(5) }}
                    onPress={async () => {
                        navigation.navigate(ScreenNames.login)
                        AsyncStorage.setItem(asyncKeys.check, "login")
                    }}
                />)}
                bottomBarColor={colors.white}
                bottomBarHighlight={false}
                skipToPage={2}
                DotComponent={Square}
                NextButtonComponent={({ ...props }) => (<TouchableOpacity


                    {...props}
                >
                    <View style={styles.nxtBtn}>
                        <Icon
                            name="right"
                            size={30}
                            style={{ alignSelf: 'center' }} />
                    </View>
                </TouchableOpacity>)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        border: 1,
        height: hp('70%'),
        width: wp('100%'),
        justifyContent: 'center',
        backgroundColor: colors.background
    },
    img: {
        borderRadius: 200,
        alignSelf: 'center',
        height: hp('45%'),
        width: hp('45%'),
    },
    nxtBtn: {
        backgroundColor: colors.green,
        borderRadius: wp(30),
        height: hp(8),
        width: hp(8),
        justifyContent: 'center',
        marginBottom: hp(1),
        marginRight: hp(2)
    },
    txt: {
        marginTop: hp('2%'),
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlignVertical: "center",
        textAlign: 'center',
        marginBottom: hp(3)
    }
})