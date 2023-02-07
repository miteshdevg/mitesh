import { useRoute } from "@react-navigation/native"
import { useEffect } from "react";
import { View } from "react-native";
import { Image, SafeAreaView, Text } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Header from "../components/Header";
import colors from "../styles/colors";
import font from "../styles/font";
import { globalStyles } from "../styles/styles";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
export default ApiDetailsScreen = () => {
    let route = useRoute()
    const img = route.params.item.images
    const { brand, category, description, discountPercentage, id, images, price, rating, stock, thunmnail, title } = route.params.item
    useEffect(() => {
        console.log(route.params);
    }, [])
    console.log(img);
    const Item = ({ item }) => {
        console.log(item);
        return (
            <View style={{ height: heightPercentageToDP(20), width: widthPercentageToDP(20), alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{ alignSelf: 'center', backgroundColor: 'black', width: heightPercentageToDP(20), height: heightPercentageToDP(20) }}
                    source={{ uri: item }} />
            </View>
        )
    }
    return (
        <View style={[globalStyles.containor, { backgroundColor: colors.background }]}>
            <Header
                name={"details"} />
            <Carousel
                data={images}
                renderItem={Item}
                sliderWidth={500}
                itemWidth={300}
                activeSlideAlignment='start'
                layout={'stack'}
                layoutCardOffset={`18`}
                loop={true}
                autoplay={true}
            />
            <View style={{ justifyContent: 'center', marginBottom: heightPercentageToDP(50)}}>
                <Text>{title}</Text>
                <Text>{brand}</Text>
                <Text>{description}</Text>
               <Text></Text>
                <Text style={{ color: 'red', fontStyle: 'italic',textDecorationLine:'line-through' }}>{discountPercentage}%</Text>
               <Text></Text>
                <Text>{category}</Text>
                
            </View>
        </View>
    )
}