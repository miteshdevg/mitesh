import React, { useEffect, useState } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screen/LoginScreen';
import OnboadingScreen from '../screen/OnboadingScreen';
import createAcScreen from '../screen/createAcScreen';
import ScreenNames from './ScreenNames';
import { ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screen/HomeScreen';
import detail from '../screen/Detail';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ico from 'react-native-vector-icons/AntDesign';
import colors from '../styles/colors';
import { TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Favorite from '../screen/Favorite';
import Shopping from '../screen/Shopping';
import ProfileScreen from '../screen/ProfileScreen';
import asyncKeys from '../utils/asyncKeys';
import ScanScreen from '../screen/ScanScreen';
import ApiDetailScreen from '../screen/ApiDetailScreen';
import apiDummy from '../screen/apiDummy';
import reduxScreen from '../screen/reduxScreen';

import reduxcallingAPis from '../screen/reduxcallingAPis';
import LeaderBoardScreen from '../screen/quiz/LeaderBoardScreen';
import Rkt from '../screen/quiz/rkt';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const Home = () => {

    return (
        <Tab.Navigator initialRouteName='home' screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.green }}>
            <Tab.Screen name="home" component={HomeScreen} options={{
                tabBarLabel: "home", tabBarIcon: ({ color, size }) => {
                    return (
                        <Icon name='home'
                            size={size}
                            color={color} />

                    )
                }
            }} />
            <Tab.Screen name="Favorite" component={Favorite} options={{
                tabBarIcon: ({ color, size }) => {
                    return (
                        <Icon name='heart-outline'
                            size={size}
                            color={color} />

                    )
                }
            }}
            />
            <Tab.Screen name="person" component={ScanScreen} options={{
                tabBarLabel: "",
                tabBarIcon: ({ color, size }) => {
                    return (
                        <View style={style.view}>
                            <Icon
                                name="image-filter-center-focus-strong-outline"
                                size={size}
                                color={colors.white} />
                        </View>
                    )
                },

            }} />
            <Tab.Screen name="per" component={Shopping} options={{
                tabBarLabel: "shopping", tabBarIcon: ({ color, size }) => {
                    return (
                        <Icon name='shopping'
                            size={size}
                            color={color} />

                    )
                }
            }}
            />
            <Tab.Screen name="profile" component={ProfileScreen} options={{
                tabBarLabel: "profile", tabBarIcon: ({ color, size }) => {
                    return (
                        <Ico name='user'
                            size={size}
                            color={color} />
                    )
                }
            }}
            />

        </Tab.Navigator>
    )
}

export default Navigation = () => {
    // const [check, ischeck] = useState(null)
    const [all, setAll] = useState('')

    useEffect(() => {
        checking()
    }, []);
    const checking = async () => {
        let result = await AsyncStorage.getItem(asyncKeys.check)
        console.log("-=-=-==", result);
        if (result) {
            setAll(result)
            console.log("-=-=-=-=-=-=-=-=-==-=-my family", result);
        }

        else {
            setAll('logout')
        }

    }
    console.log(all, "-----");
    if (!all) {
        console.log('render...')
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }
    else {
        console.log("hello", all);
    }

    return (
        <NavigationContainer>
            {/* <Stack.Navigator initialRouteName={all == "login" ? ScreenNames.login : all == "homescreen" ? ScreenNames.home : ScreenNames.onboarding}> */}
            <Stack.Navigator initialRouteName="screen">
                <Stack.Screen name={ScreenNames.onboarding} component={OnboadingScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ScreenNames.reduxScreen} component={reduxScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ScreenNames.login} component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ScreenNames.create} component={createAcScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ScreenNames.home} component={Home} options={{ headerShown: false }} />
                <Stack.Screen name={ScreenNames.ApiDetailScreen} component={ApiDetailScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ScreenNames.APiDummy} component={apiDummy} options={{ headerShown: false }} />
                <Stack.Screen name={ScreenNames.Detail} component={detail} options={{ headerShown: false }} />
                <Stack.Screen name={ScreenNames.reduxAPI} component={reduxcallingAPis} options={{ headerShown: false }} />
                <Stack.Screen name={"screen"} component={Rkt} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );

}


const style = StyleSheet.create({
    view: {
        backgroundColor: colors.green,
        height: heightPercentageToDP(7),
        justifyContent: 'center',
        width: heightPercentageToDP(7),
        alignItems: 'center',
        borderRadius: 30,
        marginBottom: 50,
        borderColor: colors.background,
        border: 5,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderTopWidth: 5,
        //  borderBottomColor:colors.background,
        borderRightWidth: 5
    }

})