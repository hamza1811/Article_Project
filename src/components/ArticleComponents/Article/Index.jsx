import React, { useState } from "react";
import { connect } from "react-redux";
import {
  addArticle,
  updateArticle,
} from "../../../redux/Article/article-action";
import { Editor } from "@tinymce/tinymce-react";
import {
  fetchArticleById,
  isLoading,
} from "../../../redux/Article/article-selectors";
import { loggedInUserData } from "../../../redux/ArticleUsers/user-selectors";
import ArticleLoading from "./ArticleLoading";
import Swal from "sweetalert2";

const mapDispatchToProps = (dispatch) => {
  return {
    addArticle: (ArticleData) => dispatch(addArticle(ArticleData)),
    updateArticle: (formData, articleId) =>
      dispatch(updateArticle(formData, articleId)),
  };
};
const mapStateToProps = (state, props) => {
  const { ArticleId } = props;
  return {
    Article: fetchArticleById(state, ArticleId),
    userData: loggedInUserData(state),
    isLoading: isLoading(state),
    isNewArticleAdded: state.Article.IsNewArticleAdded,
  };
};

function AddArticle(props) {
  const { Article } = props;

  const [email, setEmail] = useState(
    props.userData.email ? props.userData.email : ""
  );
  const [authorName, setAuthorName] = useState(
    props.userData.displayName ? props.userData.displayName : ""
  );
  const [ArticleText, setArticleText] = useState(
    Article ? Article.ArticleText : ""
  );
  const [uid, setUid] = useState(props.userData.uid);

  const articleStatus = "Pending Review";

  const [ArticleTitle, setArticleTitle] = useState(
    Article ? Article.ArticleTitle : ""
  );

  const publishDate = new Date();

  const submitHandler = async (e) => {
    e.preventDefault();
    const ArticleData = {
      uid,
      ArticleTitle,
      email,
      authorName,
      ArticleText,
      articleStatus,
      publishDate,
    };
    const result = await props.addArticle(ArticleData);
    if (result.status === 200) {
      showSuccessMessage();
    } else if (result.status === 400) {
      showErrorMessage(result.message);
    }
    resetForm();
  };

  const showErrorMessage = (message) => {
    return Swal.fire("Oops!", message, "error");
  };

  const showSuccessMessage = () => {
    return Swal.fire(
      "Congratualtions!",
      "Article sent for Review. Once it gets approve, It will display on frontend",
      "info"
    );
  };

  const updateHandler = async (e) => {
    try {
      e.preventDefault();
      const ArticleData = {
        uid,
        ArticleTitle,
        email,
        authorName,
        ArticleText,
        publishDate,
      };
      await props.updateArticle(ArticleData, Article.id);
    } catch (error) {
      alert(error.message);
    }
  };

  const resetForm = () => {
    setEmail("");
    setAuthorName("");
    setArticleText("");
    setArticleTitle("");
  };

  const handleChange = (content, editor) => {
    setArticleText(content);
  };

  return (
    <div className='conntainer col-md-9 mx-auto mt-5'>
      <div className='form'>
        <form
          onSubmit={
            Article ? (e) => updateHandler(e) : (e) => submitHandler(e)
          }>
          <div className='form-group'>
            <label htmlFor='exampleFormControlInput1'>Article Title</label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              placeholder='title...'
              value={ArticleTitle}
              onChange={(e) => setArticleTitle(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <Editor
              value={ArticleText}
              init={{
                height: 500,
                menubar: true,
              }}
              onEditorChange={handleChange}
            />
          </div>
          {props.isLoading ? (
            <ArticleLoading />
          ) : (
            <div className='form-group col text-center'>
              <input
                type='submit'
                value={Article ? "Update" : "Save"}
                className='btn btn-info btn-lg'
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
