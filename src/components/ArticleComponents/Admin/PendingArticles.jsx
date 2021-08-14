import React from "react";
import { connect } from "react-redux";
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
  let flagToCheckArticles = false;

  const updateArticleStatusHandler = async (status, ArticleId) => {
    await props.updateArticleStatus(status, ArticleId);
  };

  return (
    <div className='container'>
      {props.isLoading && <ArticleLoading />}
      {props.Articles.map((Article, index) =>
        Article.articleStatus === REVIEW_PENDING ||
        Article.articleStatus === DECLINEED ? (
          <div key={index}>
            <div className='mt-5 mb-5'>
              {showFetchArticle(Article)}
              <div className='container'>
                <p className='lead mb-0'>
                  <span className='font-weight-bold'>Author:</span>{" "}
                  <span>{Article.authorName}</span>
                </p>
                <p className='lead mb-0'>
                  <span className='font-weight-bold'>Update Status:&nbsp;</span>
                  <button
                    onClick={(e) =>
                      updateArticleStatusHandler("Published", Article.id)
                    }
                    className='btn btn-success mr-1'>
                    Publish
                  </button>
                  <button
                    onClick={(e) =>
                      updateArticleStatusHandler("Declined", Article.id)
                    }
                    className='btn btn-danger'>
                    Decline
                  </button>
                </p>
                <p className='lead'>
                  <span className='font-weight-bold'>Current Status:</span>
                  <span> {Article.articleStatus}</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          (flagToCheckArticles = true)
        )
      )}
      {flagToCheckArticles && (
        <blockquote className='blockquote text-center'>
          <p className='mt-2'>No Pending Article :)</p>
        </blockquote>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingArticles);
