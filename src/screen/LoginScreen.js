import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import CheckBox from '@react-native-community/checkbox'
import string from '../language/string';
import colors from '../styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LoginButton, AccessToken } from 'react-native-fbsdk-next';
import SplashScreen from 'react-native-splash-screen';
import ScreenNames from '../navigation/ScreenNames';
import { globalStyles } from '../styles/styles';
import Btn from '../components/Btn';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import TextView from '../components/TextView';
import font from '../styles/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import asyncKeys from '../utils/asyncKeys';
import axios from "axios";

export default LogIn = () => {
    const [checkbox, ischeck] = useState(false)
    const [user, setUser] = useState({})
    const [mail, checkmail] = useState('')
    const [pass, checkpas] = useState('')
    const navigation = useNavigation();
    const focus = useIsFocused()
    useEffect(() => {
        Platform.OS === 'android' ? SplashScreen.hide() : ""
        logStatus()
        GoogleSignin.configure({
            webClientId: '',

            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            iosClientId: '', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        });
        isSignedIn()

    }, [focus]);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            setUser(userInfo)
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };
    const isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (!!isSignedIn) {
            getCurrentUserInfo()
        } else {
            console.log('Please Login')
        }
    };
    const getCurrentUserInfo = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            setUser(userInfo);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                alert('User has not signed in yet');
                console.log('User has not signed in yet');
            } else {
                alert("Something went wrong. Unable to get user's info");
                console.log("Something went wrong. Unable to get user's info");
            }
        }
    };
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setUser({}); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };
    const logStatus = () => {
        checkmail('')
        checkpas('')

    }
    const check = async () => {
        let result = await axios.post('https://dummyjson.com/auth/login',
            {
                username: mail,
                password: pass,
            }, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(async (res) => {
                //  console.log(JSON.stringify(res));
                if (res.status == 200) {
                    let result = res.data
                    console.log("in if condiytion=-=-=");
                    //  let result = await res.json()
                    console.log("::::::",);
                    AsyncStorage.setItem(asyncKeys.check, "homescreen")
                    AsyncStorage.setItem(asyncKeys.user, JSON.stringify(result))
                    navigation.navigate(ScreenNames.home)
                }
                else {
                    alert("wrong password and username")
                }
            })
            .catch(error => {
                console.log(error);
                alert(error)
            }).finally(async () => {
            });
        console.log("hellow");
    }

    return (
        <View style={styles.view}>
            <Text style={styles.txtWlc}>{string.wlc}</Text>
            <Text style={styles.txtWlcBack}>{string.wlcback}</Text>
            <Text style={[styles.txtWlc, { marginTop: 30, fontSize: 18 }]}>{string.mail}</Text>
            <TextView
                val={mail}
                textChange={(e) => checkmail(e)}
                name={string.email} />
            <Text style={[styles.txtWlc, { marginTop: 30, fontSize: 18 }]}>{string.pas}</Text>
            <TextView
                val={pass}
                textChange={(p) => checkpas(p)}
                secure={true}
                name={string.password} />
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: wp(1)
            }}>
                <CheckBox
                    style={{
                        height: hp(1.5),
                        marginTop: hp(2.3),
                        width: wp(1.5),
                        marginRight: hp(1)
                    }}
                    boxType="square"
                    shouldRasterizeIOS={1}
                    lineWidth={2}
                    onFillColor={colors.green}
                    onCheckColor={colors.white}
                    onTintColor={colors.white}
                    onChange={() => { ischeck(!checkbox) }}
                    value={checkbox}
                    animationDuration={0.2}
                />
                <Text style={styles.checkBoxTxt}>{string.checkbox}</Text>
                <TouchableOpacity>
                    <View style={styles.txtForget}>
                        <Text>{string.paswd}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <Btn
                name={string.sign}
                onPress={() => { check() }}
            />
            <Btn
                touchStyle={globalStyles.btnGoogle}
                image={true}
                onPress={() => {
                    console.log("helo,.,.,.,.,.,.,-=-=");

                    GoogleSignin.configure({
                        androidClientId: '328481888172-9smeg0tpgjud4k6eblho05lal98gglb9.apps.googleusercontent.com',
                        iosClientId: '328481888172-lb79kd3j112h9tn9f4on2uu83t97vai0.apps.googleusercontent.com',
                    });
                    GoogleSignin.hasPlayServices().then((hasPlayService) => {

                        if (hasPlayService) {
                            GoogleSignin.signIn().then((userInfo) => {
                                console.log(JSON.stringify(userInfo.user))
                                console.log("Gmails-login");
                                AsyncStorage.setItem("Gmail", JSON.stringify(userInfo.user))
                                AsyncStorage.setItem(asyncKeys.check, "homescreen")
                                navigation.navigate(ScreenNames.home)
                            }).catch((e) => {
                                console.log("ERROR IS: " + e);
                            })
                        }
                    })
                }}

                txtStyle={globalStyles.txtgoogle}
                name={string.google} />
            <LoginButton
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            console.log("login has error: " + result.error);
                        } else if (result.isCancelled) {
                            console.log("login is cancelled.");
                        } else {
                            AccessToken.getCurrentAccessToken().then(
                                async (data) => {
                                    navigation.navigate(ScreenNames.home)
                                    console.log(data);
                                    console.log(data.accessToken.toString())
                                    AsyncStorage.setItem("faceBook", JSON.stringify(userInfo.user))
                                    AsyncStorage.setItem(asyncKeys.check, "homescreen")
                                }
                            )
                        }
                    }
                }

                onLogoutFinished={() => console.log("logout.")}

            />

            <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.create)} style={[styles.txtDont, { justifyContent: 'space-between' }]}>
                <Text style={[globalStyles.txtSing, { justifyContent: 'space-between', }]}>{string.dont}&nbsp;
                    <Text style={[styles.txtCreateFree, {}]}>{string.createFree}</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    txtCreateFree: {
        fontWeight: 'bold',
        color: colors.black,
    },
    txtWlc: {
        marginTop: hp(15),
        fontSize: hp(4),
        fontFamily: font.bold
    },
    checkBoxTxt: {
        marginVertical: hp(2),
        color: colors.grey,
        marginRight: wp(10),
        marginLeft: Platform.OS === 'android' ? 12 : 0
    },
    txtDont: {
        marginTop: hp(2),
        flexDirection: 'row',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
    },
    view: {
        flex: 1,
        backgroundColor: colors.background,
        marginHorizontal: wp(6),
    },
    txtWlcBack: {
        fontSize: wp(4.5),
        color: colors.grey,
        marginTop: hp(1)
    },
    txtForget: {
        marginVertical: hp(2)
    },
})