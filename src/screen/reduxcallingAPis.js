import { View } from "react-native"
import { Provider } from "react-redux"
import { store } from "../../redux/store"
import ReduxAPI from "../components/ReduxAPI"
import { globalStyles } from "../styles/styles"

export default reduxallAPi = () => {
    return (
        <Provider store={store}>
            <ReduxAPI />
        </Provider>
    )
}