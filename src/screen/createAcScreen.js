import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import string from '../language/string';
import colors from '../styles/colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen';
import font from '../styles/font';
import ScreenNames from '../navigation/ScreenNames';
import { globalStyles } from '../styles/styles';
import Btn from '../components/Btn';
import TextView from '../components/TextView';

export default LogIn = ({ navigation }) => {

    const [mail, checkmail] = useState('');
    const [name, checkName] = useState('');

    const [pass, checkpas] = useState('');
    useEffect(() => {
        Platform.OS === 'android' ? SplashScreen.hide() : ""
    }, []);

    const validate = () => {
        const re = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        let result = re.test(mail);

        if (!result) {
            alert("enter a valid email");
            return;
        }
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(pass)) {
            alert("Password must not contain Whitespaces.")
            return;
        }
        const isContainsUppercase = /^(.*[A-Z]).*$/;
        if (!isContainsUppercase.test(pass)) {
            alert("Password must have at least one Uppercase Character.")
            return;
        }
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(pass)) {
            alert("Password must have at least one Lowercase Character.")
            return;
        }
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(pass)) {
            alert("Password must contain at least one Digit.")
            return;
        }
        const isContainsSymbol =
            /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(pass)) {
            alert("Password must contain at least one Special Symbol.")
            return;
        }
        const isValidLength = /^.{10,16}$/;
        if (!isValidLength.test(pass)) {
            alert("Password must be 10-16 Characters Long.")
            return;
        }
    }

    return (
        <View style={styles.view}>
            <Text style={styles.txtWlc}>{string.createAC}</Text>
            <Text style={styles.txtWlcBack}>{string.lets}</Text>
            <Text style={[styles.txtWlc, { marginTop: 30, fontSize: 18 }]}>{string.Fname}</Text>
            <TextView
                value={name}
                name={string.name}
                textChange={(n) => checkName(n)} />

            <Text style={[styles.txtWlc, { marginTop: 30, fontSize: 18 }]}>{string.mail}</Text>
            <TextView
                value={mail}
                textChange={(e) => checkmail(e)}
                name={string.email} />
            <Text style={[styles.txtWlc, { marginTop: 30, fontSize: 18 }]}>{string.pas}</Text>

            <TextView
                val={pass}
                textChange={(p) => checkpas(p)}
                secure={true}
                name={string.password} />
            <Btn
                onPress={() => validate()}
                name={string.sinUP}
            />
            <Btn
                touchStyle={globalStyles.btnGoogle}
                image={true}
                txtStyle={globalStyles.txtgoogle}
                name={string.singUPGo} />

            <TouchableOpacity onPress={() => navigation.navigate(ScreenNames.login)} style={[styles.txtAlready, { justifyContent: 'space-between' }]} >
                <Text style={[styles.txtSingUpGo, { justifyContent: 'space-between', }]}>{string.already}&nbsp;
                    <Text style={[styles.txtSign]}>{string.sign}</Text>
                </Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    txtSign: {
        fontWeight: 'bold',
        color: colors.black,
    },
    txtWlc: {
        marginTop: hp(15),
        fontSize: hp(4),
        fontFamily: font.bold
    },
    txtAlready: {
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
    txtSingUpGo: {
        color: "black",
        color: colors.grey,
        alignSelf: 'center',
        marginHorizontal: wp(6),
        marginLeft: 8,
    },
})