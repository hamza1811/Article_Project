import React from "react";
import { connect } from "react-redux";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteArticle } from "../../../redux/Article/article-action";
import { isLoading } from "../../../redux/Article/ArticleSelectors";
import ArticleLoading from "../Article/ArticleLoading";
import { Heading } from "../Article/FtechArticles";

const mapStateToProps = (state, props) => {
  return {
    Articles: state.Article.ArticleData.filter(
      (Article) => Article.uid === props.match.params.id && Article
    ),
    isLoading: isLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteArticle: (articleId) => dispatch(deleteArticle(articleId)),
  };
};

function YourArticles(props) {
  const deleteArticleHandler = (articleId) => {
    props.deleteArticle(articleId);
  };

  return (
    <div>
      {props.isLoading && <ArticleLoading />}
      {props.Articles.map((Article, index) => (
        <div key={index} className='container'>
          <div className='mt-5 mb-5'>
            <div className='container'>
              <Heading>{Article.ArticleTitle}</Heading>
              <p className='lead'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      `${Article.ArticleText.substr(0, 300)}`
                    ),
                  }}
                />
                <Link to={`/full-article/${Article.id}`} className='link-light'>
                  Learn More
                </Link>
              </p>
              <div>
                <Link
                  to={`/edit-article/${Article.id}`}
                  className='link-light pr-4'>
                  Edit <FontAwesomeIcon icon={faEdit} />
                </Link>
                <Link
                  to='#'
                  onClick={(e) => deleteArticleHandler(Article.id)}
                  className='link-light'>
                  Delete <FontAwesomeIcon icon={faTrash} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      {props.Articles.length === 0 && (
        <div className='container'>
          <blockquote className='blockquote text-center'>
            <p className='mt-2'>No Article found :(</p>
          </blockquote>
        </div>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(YourArticles);
