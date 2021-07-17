import React from "react";
import { connect } from "react-redux";
import DOMPurify from "dompurify";
import {
  fetchArticleById,
  isLoading,
} from "../../../redux/Article/ArticleSelectors";
import ArticleLoading from "./ArticleLoading";
import DisqusComment from "../../DisqusComment";
import styled from "styled-components";
import { Heading } from "./FtechArticles";

const mapStateToProps = (state, props) => {
  return {
    Article: fetchArticleById(state, props.match.params.id),
    isLoading: isLoading(state),
  };
};

function FullArticle(props) {
  const [Article, setArticle] = React.useState(props.Article);
  const FullArticlWrapper = styled.div`
    width: 100%;
    min-height: 200px;
    margin: 30px auto;
    box-sizing: border-box;
    pre {
      width: 100% !important;
    }
  `;
  // const TextWrapper = styled.p`
  //   border: 1px solid red;
  // `;
  React.useEffect(() => {
    setArticle(props.Article);
  }, [props.Article]);

  const showFetchArticle = (Article) => {
    const ArticleText = Article?.ArticleText;
    return (
      <FullArticlWrapper>
        <div className='container'>
          <Heading> {Article?.ArticleTitle}</Heading>
          <p className='lead full-article-text'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(`${ArticleText}`),
              }}
            />
          </p>
          <div className='mb-4'>
            <i>Written By- {props.Article?.authorName} </i>
          </div>
          <DisqusComment slug={Article?.id} title={Article?.ArticleTitle} />
        </div>
      </FullArticlWrapper>
    );
  };

  return (
    <div className='container'>
      {props.isLoading ? (
        <ArticleLoading />
      ) : (
        <div className=''>{showFetchArticle(props.Article)}</div>
      )}
    </div>
  );
}

export default connect(mapStateToProps)(FullArticle);
