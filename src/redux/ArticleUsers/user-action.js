import { fireDB } from "../../firebase";
import Swal from "sweetalert2";
import { IS_SIGN_OUT_SUCCESS, CHECK_USER_IS_LOGGED_IN, SET_USER_DATA } from "./user-actionType";
import { ARTICLES_FETCHING } from "../Article/article-actionType";
import { auth } from "../../firebase";


export const addUser = (user) => async (dispatch) => {
    // const connection = fireDB.database().ref("/userCollection");

    const fireAuthObj = fireDB.auth();

    const { email, password, name } = user;

    await fireAuthObj
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
            result.user.updateProfile({
                displayName: name
            })
            Swal.fire("Success", "User Registered Successfully", "success");
        })
        .catch(
            (error) => {
                const { message } = error;
                if (message) {
                    Swal.fire("Oops!", message, "error");
                }
            });
};

export const authUser = (email, password) => async (dispatch) => {
    // const connection = fireDB.database().ref("/userCollection");

    const fireAuthObj = fireDB.auth();
    dispatch({ type: ARTICLES_FETCHING, payload: true })
    await fireAuthObj
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
            // dispatch(authUserName(result.user.displayName))
            Swal.fire("Success", "User Logged In Successfully", "success");
            dispatch({ type: ARTICLES_FETCHING, payload: false })

        })
        .catch((error) => {
            const { message } = error;
            Swal.fire("Oops!", message, "error");
            dispatch({ type: ARTICLES_FETCHING, payload: false })
        });
};

export const updateUserData = (userData) => async (dispatch) => {
    const fireAuthObj = fireDB.auth();
    const { uid, name } = userData;
    dispatch({ type: ARTICLES_FETCHING, payload: true })
    await fireAuthObj.currentUser.updateProfile({
        displayName: name,
    }).then(() => {
        Swal.fire("Success", "Porfile updated", "success")
        dispatch({ type: ARTICLES_FETCHING, payload: false })

    }).catch((error) => {
        const { message } = error
        Swal.fire("Oops!", message, "error")
        dispatch({ type: ARTICLES_FETCHING, payload: false })

    })
}

export const isUserLoggedIn = () => async (dispatch) => {
    dispatch({ type: ARTICLES_FETCHING, payload: true })
    await auth.onAuthStateChanged((user) => {
        if (user) {
            dispatch({ type: ARTICLES_FETCHING, payload: false })
            dispatch({ type: CHECK_USER_IS_LOGGED_IN, payload: user.displayName })
            dispatch({ type: SET_USER_DATA, payload: user })
        } else {
            dispatch({ type: ARTICLES_FETCHING, payload: false })
        }
    });
}

export const userSigingOut = () => async (dispatch) => {
    await auth.signOut().then((result) => {
        dispatch({ type: IS_SIGN_OUT_SUCCESS, payload: "" })
        dispatch({ type: SET_USER_DATA, payload: "" })
        Swal.fire("Success", "Signed Out Successfully", "success");
    })
        .catch((error) => {
            Swal.fire("Oops!", "Something went wrong", "error");
        })
}


