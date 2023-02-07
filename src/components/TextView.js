import React from "react";
import { TextInput } from "react-native";
import colors from "../styles/colors";
import { globalStyles } from "../styles/styles";

export default TextView = (prop) => {
    return (

        <TextInput
            placeholderTextColor={colors.grey}
            style={globalStyles.input}
            value={prop.val}
            onChangeText={prop.textChange}
            placeholder={prop.name}
            secureTextEntry={prop.secure}
        />

    )
}