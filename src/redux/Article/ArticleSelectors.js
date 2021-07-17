
export const fetchAllArticles = (state) => {
    return state.Article.ArticleData
}

export const fetchArticleById = (state, ArticleId) => {
    return state.Article.ArticleData.find((Article) => Article.id === ArticleId)
}


export const isLoading = state => {
    return state.Article.loading
}