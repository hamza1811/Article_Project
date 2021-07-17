import { combineReducers } from 'redux';

import addArticleReducer from "./Article/article-reducer";
import addUserReducer from "./ArticleUsers/user-reducer";



const rootReducer = combineReducers({
    Article: addArticleReducer,
    user: addUserReducer,
});

export default rootReducer;