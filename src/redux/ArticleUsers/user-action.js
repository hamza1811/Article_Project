import { fireDB } from "../../firebase";
import Swal from "sweetalert2";
import {
    IS_SIGN_OUT_SUCCESS,
    CHECK_USER_IS_LOGGED_IN,
    SET_USER_DATA,
} from "./user-actionType";
import { ARTICLES_FETCHING } from "../Article/article-actionType";
import { auth } from "../../firebase";

const fireAuthObj = fireDB.auth();

export const addUser = (user) => async () => {
    try {
        const { email, password, name } = user;
        const result = await fireAuthObj.createUserWithEmailAndPassword(email, password);
        await result.user.updateProfile({ displayName: name });
        return {
            status: 200,
        }
    }
    catch (error) {
        const { message } = error;
        if (message)
            Swal.fire("Oops!", message, "error");
        return {
            message,
            status: 400, // Bad request
        }
    };
};

export const authUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: ARTICLES_FETCHING, payload: true });
        await fireAuthObj.signInWithEmailAndPassword(email, password);
        dispatch({ type: ARTICLES_FETCHING, payload: false });
        return {
            status: 200,
        }
    }
    catch (error) {
        dispatch({ type: ARTICLES_FETCHING, payload: false });
        const { message } = error;
        return {
            message,
            status: 400, // Bad request
        }
    };
};

export const updateUserData = (userData) => async (dispatch) => {
    try {
        const { name } = userData;
        dispatch({ type: ARTICLES_FETCHING, payload: true });
        await fireAuthObj.currentUser.updateProfile({
            displayName: name,
        })
        dispatch({ type: ARTICLES_FETCHING, payload: false });
        return {
            status: 200,
        }
    }
    catch (error) {
        dispatch({ type: ARTICLES_FETCHING, payload: false });
        const { message } = error;
        return {
            message,
            status: 400, // Bad request
        }
    };
};

export const isUserLoggedIn = () => (dispatch) => {
    try {
        dispatch({ type: ARTICLES_FETCHING, payload: true });
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch({ type: ARTICLES_FETCHING, payload: false });
                dispatch({ type: CHECK_USER_IS_LOGGED_IN, payload: user.displayName });
                dispatch({ type: SET_USER_DATA, payload: user });
            }
        });
    }
    catch (error) {
        console.log(error);
        dispatch({ type: ARTICLES_FETCHING, payload: false });

    }
};

export const userSigingOut = () => async (dispatch) => {
    try {
        await auth.signOut();
        dispatch({ type: IS_SIGN_OUT_SUCCESS, payload: "" });
        dispatch({ type: SET_USER_DATA, payload: "" });
    } catch (error) {
        console.log(error)
    }
};
