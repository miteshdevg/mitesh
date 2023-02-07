import React from "react";
import { TouchableOpacity, Text, Image } from 'react-native';
import { globalStyles } from "../styles/styles";

export default Btn = ({ ...props }) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={[globalStyles.btn, props.touchStyle]} {...props}>
            {props.image ? <Image
                style={globalStyles.img}
                source={require('../asset/image/google.png')} ></Image> : ""}
            <Text style={[globalStyles.txtGreenBtn, props.txtStyle]}>{props.name}</Text>
        </TouchableOpacity>
    )
}