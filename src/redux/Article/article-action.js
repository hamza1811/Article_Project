import { ADD_ARTICLE, ARTICLES_FETCHING } from "./article-actionType"
import { fireDB } from "../../firebase";
import Swal from "sweetalert2";

const connection = fireDB.database().ref("/articleCollection");

export const addArticle = (formData) => async () => {
    await connection.push(formData);
}

export const updateArticle = (updatedFormData, ArticleId) => async dispatch => {
    dispatch({ type: ARTICLES_FETCHING, payload: true })
    await connection.child(ArticleId).update(updatedFormData, (error) => {
        if (!error) {
            dispatch({ type: ARTICLES_FETCHING, payload: false })
            Swal.fire("Success", "Article updated Successfully", "info");
        } else {
            dispatch({ type: ARTICLES_FETCHING, payload: false })
            Swal.fire("Oops!", "Article couldn't updated", "warning");
        }
    });
}

export const fetchArticles = () => dispatch => {
    dispatch({ type: ARTICLES_FETCHING, payload: true })
    connection.on('value', snapchat => {
        const duplicateArray = snapchat.val()

        const originalArray = []

        for (const id in duplicateArray) {
            originalArray.push({ id, ...duplicateArray[id] })
        }

        dispatch({ type: ADD_ARTICLE, payload: originalArray })
        dispatch({ type: ARTICLES_FETCHING, payload: false })
    }, error => {
        console.log(error)
    })
}

export const deleteArticle = (ArticleId) => async () => {
    await connection.child(ArticleId).remove();
}