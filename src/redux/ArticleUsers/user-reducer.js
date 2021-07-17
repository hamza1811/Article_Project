import { GET_NAME_OF_AUTHENTICATE_USER, CHECK_USER_IS_LOGGED_IN, IS_SIGN_OUT_SUCCESS, SET_USER_DATA } from "./user-actionType";

const initialState = {
    authUserName: "",
    loggedInUserName: "",
    loggedInUserData: {}
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_NAME_OF_AUTHENTICATE_USER:
            return {
                ...state,
                authUserName: action.payload,
            }

        case CHECK_USER_IS_LOGGED_IN:
            return {
                ...state,
                loggedInUserName: action.payload,
            }
        case IS_SIGN_OUT_SUCCESS:
            return {
                ...state,
                loggedInUserName: action.payload
            }
        case SET_USER_DATA:
            return {
                ...state,
                loggedInUserData: action.payload
            }
        default:
            return state;
    }
}

export default reducer;