import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, numIncreased, numDecreased } from '../../redux/actions/countAction';
import { LogBox } from 'react-native';
import { useState } from 'react';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications
export default function Home() {
    const dispatch = useDispatch();
    const [input, setInput] = useState(0)
    const count = useSelector((store) => store.count.count);

    const decreament = () => {
        count > 0 ? dispatch(decrement()) : ""
    }

    const increament = () => {
        dispatch(increment())
    }

    

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => increament()} style={styles.btn}>
                <Text style={styles.btn_text}> + </Text>
            </TouchableOpacity>
            <Text style={styles.counter_text}>{count}</Text>
            <TouchableOpacity
                onPress={() => decreament()}
                style={{ ...styles.btn, backgroundColor: '#6e3b3b' }}>
                <Text style={styles.btn_text}> - </Text>
            </TouchableOpacity>
            </View>
            <TextInput
                placeholder='enter a number'
                value={input}

                onChangeText={(e) => { setInput(Number(e)) }} />
            <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => {
                    const isContainsNumber = /^(?=.*[0-9]).*$/;
                    if (isContainsNumber.test(input)) {

                        dispatch(numIncreased(input))

                    }
                    else {
                        alert("enter a numbers")
                    }
                }} style={{ ...styles.btn, }}>
                    <Text style={styles.btn_text}>+ by number</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        
                        const isContainsNumber = /^(?=.*[0-9]).*$/;
                        if (isContainsNumber.test(input)) {

                            dispatch(numDecreased(input))

                        }
                        else {
                            alert("enter a numbers")
                        }
                    }}
                    style={{ ...styles.btn, backgroundColor: '#6e3b3b' }}>
                    <Text style={styles.btn_text}> - by number </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'column',
        padding: 50,
    },
    title_text: {
        fontSize: 40,
        fontWeight: '900',
        marginBottom: 55,
    },
    counter_text: {
        fontSize: 35,
        fontWeight: '900',
        margin: 15,
    },
    btn: {
        backgroundColor: '#086972',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    btn_text: {
        fontSize: 23,
        color: '#fff',
    },
});