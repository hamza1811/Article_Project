import { GET_NAME_OF_AUTHENTICATE_USER, CHECK_USER_IS_LOGGED_IN, IS_SIGN_OUT_SUCCESS, SET_USER_DATA } from "./user-actionType";

const initialState = {
    authUserName: "",
    loggedInUserName: "",
    isAdmin: false,
    loggedInUserData: {}
}

const reducer = (state = initialState, action) => {
    const adminEmail = "hamza.khan@mail.com"
    switch (action.type) {
        case GET_NAME_OF_AUTHENTICATE_USER:
            return {
                ...state,
                authUserName: action.payload,
            }

        case CHECK_USER_IS_LOGGED_IN:
            return {
                ...state,
                loggedInUserName: action.payload
            }
        case IS_SIGN_OUT_SUCCESS:
            return {
                ...state,
                loggedInUserName: action.payload
            }
        case SET_USER_DATA:
            return {
                ...state,
                loggedInUserData: action.payload,
                isAdmin: adminEmail === action.payload.email
            }
        default:
            return state;
    }
}

export default reducer;