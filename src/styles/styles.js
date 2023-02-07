import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from './colors';


export const globalStyles = StyleSheet.create({
    btn: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: colors.green,
        borderRadius: 10,
        height: hp(6),
        width: wp(85),
        marginHorizontal: wp(6),
        marginTop: hp(2)
    },
    input: {
        backgroundColor: colors.white,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        color: colors.grey,
        height: hp(5)
    },
    btnGoogle: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        height: hp(6),
        justifyContent: 'center',
        width: wp('90%'),
        marginTop: hp(2),
        width: wp(85),
    },
    txtGreenBtn: {
        color: colors.white,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    txtgoogle: {
        alignSelf: 'center',
        marginHorizontal: wp(6),
        marginLeft: 8,
        fontWeight: 'bold',
        color: colors.black
    },
    txtSing: {

        color: colors.grey,
        alignSelf: 'center',
        marginHorizontal: wp(6),
        marginLeft: 8,

    },
    img: {
        alignSelf: 'auto',
        marginTop: hp(0.45),
        height: 40,
        width: 25,
    },
    containor: {
        backgroundColor: colors.background,
        flex: 1
    },
})