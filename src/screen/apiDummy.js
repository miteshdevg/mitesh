import axios from "axios"
import { style } from "deprecated-react-native-prop-types/DeprecatedViewPropTypes"
import { useEffect, useState } from "react"
import { FlatList, View, Image, Text, ActivityIndicator } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen"
import colors from "../styles/colors"
import { globalStyles } from "../styles/styles"

export default apiDummy = () => {
    const [limit, setLimit] = useState(1)
    const [page, setPage] = useState(0)
    const [item, setItem] = useState([])
    const [load, setLoad] = useState(false)

    const [refreshing, setrefreshing] = useState(false)
    const [checkstatus, setCheckstatus] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {

        setCheckstatus(true)
        await axios.get(`https://rickandmortyapi.com/api/character/?page=${limit}`).then((res) => {
            console.log(res.data.info.pages);
            setPage(res.data.info.pages)
            setrefreshing(false)
            setLimit(limit + 1)
            setItem([...item, ...res.data.results])
            console.log(res.data.results);
            setCheckstatus(false)
            setLoad(false)
        }).catch(() => {
            setLoad(false)
            setCheckstatus(false)
        })
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ height: heightPercentageToDP(12), width: widthPercentageToDP(90), marginVertical: 5, justifyContent: 'space-between', backgroundColor: colors.white, alignSelf: 'center', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ backgroundColor: colors.black, height: heightPercentageToDP(10), width: widthPercentageToDP(20), borderRadius: 20 }}
                        source={{ uri: item.image }} />

                    <View>
                        <Text>{item.name}</Text>
                        <Text style={{ marginTop: 5, color: colors.grey }}>{item.gender}</Text>
                    </View>
                </View>
                <Text >{item.species}</Text>
            </View>
        )
    }

    const onRefresh = () => {
        setrefreshing(true)
        setItem([])
        setLimit(1)
        getData()
    }
    return (
        <View style={globalStyles.containor}>
            <FlatList
                data={item}
                onRefresh={onRefresh}
                refreshing={refreshing}
                contentContainerStyle={{ paddingBottom: 10, paddingTop: 50 }}
                onEndReached={() => {
                    console.log("end..");
                    setLoad(true)
                    if (!checkstatus && page >= limit) {
                        console.log("enter in a if");
                        getData()
                    }
                }
                }
                ListFooterComponent={() =>
                    load ? <ActivityIndicator style={{ margin: 15 }} color={colors.grey} /> : null
                }

                onEndReachedThreshold={0.005}
                renderItem={renderItem}
            />
        </View>
    )
}