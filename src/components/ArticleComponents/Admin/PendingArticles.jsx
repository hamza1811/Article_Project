import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateArticleStatus } from "../../../redux/Article/article-action";
import {
  fetchAllArticles,
  isLoading,
} from "../../../redux/Article/article-selectors";
import ArticleLoading from "../Article/ArticleLoading";
import { showFetchArticle } from "../Article/FtechArticles";

const mapStateToProps = (state) => {
  return {
    Articles: fetchAllArticles(state),
    isLoading: isLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateArticleStatus: (status, ArticleId) =>
      dispatch(updateArticleStatus(status, ArticleId)),
  };
};
function PendingArticles(props) {
  const REVIEW_PENDING = "Pending Review";
  const DECLINEED = "Declined";

  const updateArticleStatusHandler = async (status, ArticleId) => {
    await props.updateArticleStatus(status, ArticleId);
  };

  return (
    <div className='container'>
      {props.isLoading && <ArticleLoading />}
      {props.Articles.map(
        (Article, index) =>
          (Article.articleStatus === REVIEW_PENDING ||
            Article.articleStatus === DECLINEED) && (
            <div key={index}>
              <div className='mt-5 mb-5'>
                {showFetchArticle(Article)}
                <div>
                  Author: {Article.authorName}
                  <br />
                  Update Status:{" "}
                  <Link
                    to='#'
                    onClick={(e) =>
                      updateArticleStatusHandler("Published", Article.id)
                    }>
                    Publish Article
                  </Link>
                  &nbsp;/&nbsp;
                  <Link
                    to='#'
                    onClick={(e) =>
                      updateArticleStatusHandler("Declined", Article.id)
                    }>
                    Decline Article
                  </Link>
                  <br />
                  Current Status: {Article.articleStatus}
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingArticles);
