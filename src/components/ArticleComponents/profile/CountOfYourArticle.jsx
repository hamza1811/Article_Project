import React from "react";
import { connect } from "react-redux";
import { fetchAllArticles } from "../../../redux/Article/ArticleSelectors";
import { loggedInUserData } from "../../../redux/ArticleUsers/UserSelectors";

const mapStateToProps = (state) => {
  return {
    allArticles: fetchAllArticles(state),
    userDetails: loggedInUserData(state),
  };
};

function CountOfYourArticle(props) {
  const { allArticles } = props;
  const { uid } = props.userDetails;
  const currentUserArticle = allArticles.filter(
    (Article) => Article.uid === uid
  );

  return <span>{currentUserArticle.length}</span>;
}

export default connect(mapStateToProps)(CountOfYourArticle);
