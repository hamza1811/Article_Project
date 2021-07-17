import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchArticles } from "../../../redux/Article/article-action";
import DOMPurify from "dompurify";
import {
  fetchAllArticles,
  isLoading,
} from "../../../redux/Article/ArticleSelectors";
import ArticleLoading from "./ArticleLoading";
// import { styles } from "../../../styles";
import styled from "styled-components";

// import "./css/Article.css";
// import { styles } from "../../../styles";

const mapStateToProps = (state) => {
  return {
    Articles: fetchAllArticles(state),
    isLoading: isLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(fetchArticles()),
  };
};
export const Heading = styled.h1`
  @media (max-width: 767px) {
    font-size: 26px;
  }
`;

function FtechArticles(props) {
  React.useEffect(() => {
    props.fetchArticles();
  }, []);

  const showFetchArticle = (Article) => {
    const ArticleText = Article.ArticleText.substr(0, 300);
    return (
      <div className='container'>
        <Heading>{Article.ArticleTitle}</Heading>
        <p className='lead'>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(`${ArticleText}`),
            }}
          />
          <Link to={`/full-article/${Article.id}`} className='link-light'>
            Learn More
          </Link>
        </p>
      </div>
    );
  };

  return (
    <div>
      {props.isLoading && <ArticleLoading />}
      {props.Articles.map((Article, index) => (
        <div key={index}>
          <div className='mt-5 mb-5'>{showFetchArticle(Article)}</div>
        </div>
      ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FtechArticles);
