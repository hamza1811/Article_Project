import React from "react";
import { connect } from "react-redux";
import AddArticle from "./Index";

const mapStateToProps = (state, props) => {
  return {
    id: props.match.params.id,
  };
};

function EditArticle(props) {
  return <AddArticle ArticleId={props.id} />;
}

export default connect(mapStateToProps)(EditArticle);
