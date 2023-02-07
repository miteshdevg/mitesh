import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux"
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from '../../redux/actions/apiAction';


export default ReduxAPI = () => {
    const dispatch = useDispatch()
    const [items, setItems] = useState(false)
    const [load, setLoad] = useState(false)
    const [pages, setPages] = useState(2)
    const { data, loading, error } = useSelector((store) => store.reduxApi);
    const [refreshing, setRefreshing] = useState(false)
    if (error) {
        alert(error)
        console.log(error);
    }
    useEffect(() => {
        fetchData()
        console.log("hello__________________1");
    }, [])

    const fetchData = async () => {
        setItems(true)
        dispatch(fetchDataRequest());
        console.log("hello__________________");
        await axios
            .get(`https://rickandmortyapi.com/api/character/?page=${pages}`)
            .then(response => {
                setItems(false)
                setRefreshing(false)
                console.log("response.-.-.-", response.data.results);
                dispatch(fetchDataSuccess([...data, ...response.data.results]))
                // data ? dispatch(fetchDataSuccess([...data, ...response.data.results])) : dispatch(fetchDataSuccess(response.data.results))
                //  { pages == 1 ? dispatch(fetchDataSuccess(response.data.results): dispatch(fetchDataSuccess([...data, ...response.data.results])) }
                //    {pages==1?dispatch(fetchDataSuccess(response.data.results))}
                { pages == 1 ? dispatch(fetchDataSuccess(response.data.results)) : dispatch(fetchDataSuccess([...data, ...response.data.results])) }
                setLoad(false)
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            })
    }
    if (!data) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
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
    const getdata = () => {
        setPages(pages + 1)
        fetchData()
    }
    const onRefresh = () => {
        setRefreshing(true)

        setPages(1)
        fetchData()
    }
    return (
        <View>
            <FlatList
                data={data}
                onRefresh={onRefresh}
                refreshing={refreshing}
                renderItem={renderItem}
                onEndReached={() => {
                    if (!items) {
                        setLoad(true)
                        setLoad(true),
                            getdata()
                    }
                }}
                onEndReachedThreshold={0.005}
                ListFooterComponent={
                    load ? <ActivityIndicator style={{ margin: 15 }} color={colors.grey} /> : null
                } />
        </View>
    )
}