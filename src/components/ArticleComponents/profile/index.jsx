import { faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { updateUserData } from "../../../redux/ArticleUsers/user-action";
import CountOfYourArticle from "./CountOfYourArticle";
import { loggedInUserData } from "../../../redux/ArticleUsers/user-selectors";
import { isLoading } from "../../../redux/Article/article-selectors";
import ArticleLoading from "../Article/ArticleLoading";

const mapStateToProps = (state) => {
  return {
    userDetails: loggedInUserData(state),
    isLoading: isLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserData: (userData) => dispatch(updateUserData(userData)),
  };
};

function MyProfile(props) {
  const { userDetails } = props;
  const [name, setName] = React.useState(userDetails.displayName);
  const [email, setEmail] = React.useState(userDetails.email);
  const [isNameReadOnly, setIsNameReadOnly] = React.useState(true);
  const [isEmailReadOnly, setIsEmailReadOnly] = React.useState(true);
  const updateHandler = (value) => {
    const userData = {
      uid: userDetails.uid,
      key: value,
      name,
    };
    props.updateUserData(userData);
  };
  return props.isLoading ? (
    <ArticleLoading />
  ) : (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-md-6 mt-4'>
          <div className='input-group'>
            <input
              className='form-control py-2'
              type='text'
              value={name}
              readOnly={isNameReadOnly}
              id='name-input'
              onChange={(e) => setName(e.target.value)}
            />
            <span className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={(e) => setIsNameReadOnly(false)}>
                Edit <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={(e) => updateHandler()}>
                Save <FontAwesomeIcon icon={faSave} />
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className='row justify-content-center'>
        <div className='col-md-6 mt-4'>
          <div className='input-group'>
            <input
              className='form-control py-2'
              type='email'
              value={email}
              id='example-search-input'
              readOnly={isEmailReadOnly}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={(e) => setIsEmailReadOnly()}
                disabled>
                Edit <FontAwesomeIcon icon={faEdit} />
              </button>
              <button
                className='btn btn-outline-secondary'
                type='button'
                // onClick={(e) => updateHandler()}
              >
                Save <FontAwesomeIcon icon={faSave} />
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className='row justify-content-center'>
        <p>
          Your Total Articles: <CountOfYourArticle />
        </p>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
