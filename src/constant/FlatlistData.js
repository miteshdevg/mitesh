import React from "react";
import image from "../asset/image/image";
import string from "../language/string";

let FlatListData = [
    {
        key: '7',
        icon: image.sofa,
        txt: "all",
        checkSelected: false,
    },
    {
        key: '0',
        icon: image.sofa,
        txt: string.chair,
        checkSelected: false
    },
    {
        key: '1',
        icon: image.sofa2,
        txt: string.sofa,
        checkSelected: false
    },
    {
        key: '2',
        icon: image.sofa3,
        txt: string.bed,
        checkSelected: true
    },
    {
        key: '3',
        icon: image.sofa4,
        txt: string.light,
        checkSelected: true
    },
    {
        key: '4',
        icon: image.sofa5,
        txt: string.fan,
        checkSelected: false
    },

]
export default FlatListData;