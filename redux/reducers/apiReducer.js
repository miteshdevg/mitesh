const initialState = {
    data: [],
    loading: false,
    error: null,
   
};

export default dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_DATA_REQUEST":
            return {
                ...state,
                loading: true
            };
        case "FETCH_DATA_SUCCESS":
            return {
                ...state,
                data: action.data,
                loading: false
            };
        case "FETCH_DATA_FAILURE":
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
};
