import { ADD_ARTICLE, ARTICLES_FETCHING } from "./article-actionType";
const initialState = {
    ArticleData: [],
    loading: false,
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_ARTICLE:
            return {
                ...state,
                ArticleData: action.payload,
            };
        case ARTICLES_FETCHING:
            return {
                ...state,
                loading: action.payload,
            }
        // case SEARCH_Article_BY_TITLE: {
        //     return {
        //         ...state,

        //     }
        // }
        default:
            return state;
    }
}

export default reducer;
