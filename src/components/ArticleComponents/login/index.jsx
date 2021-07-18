import React, { useState } from "react";
import { connect } from "react-redux";
// import Swal from "sweetalert2";
import { authUser } from "../../../redux/ArticleUsers/user-action";
import { isUserAuthenticated } from "../../../redux/ArticleUsers/user-selectors";
import { isLoading } from "../../../redux/Article/article-selectors";

import { styles } from "../../../styles";
import ArticleLoading from "../Article/ArticleLoading";
import Modal from "react-bootstrap/Modal";
// import "bootstrap/dist/css/bootstrap.min.css";

import firebase from "firebase";
import Swal from "sweetalert2";

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: (email, password) => dispatch(authUser(email, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isUserAuthenticated(state),
    isLoading: isLoading(state),
  };
};

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetClicked, setIsResetClicked] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await props.authUser(email, password);
  };

  React.useEffect(() => {
    props.isAuthenticated && props.history.push("/");
  });

  const forgotPassword = (Email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(Email)
      .then(() => {
        Swal.fire("Great!", "Check your email", "success");
      })
      .catch((error) => {
        const { message } = error;
        Swal.fire("Sorry!", message, "error");
      });
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
          <div className='card card-signin my-5'>
            <div className='card-body' style={styles.LogInWrapperStyle}>
              <h5 className='card-title text-center'>Sign In</h5>
              <hr className='my-4' />
              <form className='form-signin' onSubmit={(e) => submitHandler(e)}>
                <div className='form-label-group pt-4'>
                  <label htmlFor='inputEmail'>Email address</label>
                  <input
                    type='email'
                    className='form-control'
                    id='inputEmail'
                    placeholder='Enter Email..'
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='form-label-group pt-4'>
                  <label htmlFor='inputPassword'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    id='inputPassword'
                    placeholder='Enter Password...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='mb-3 pt-4'>
                  <span
                    onClick={() => setIsResetClicked(true)}
                    style={{ cursor: "pointer", color: "#007bff" }}>
                    Forgot Password ?
                  </span>
                </div>
                {props.isLoading ? (
                  <ArticleLoading />
                ) : (
                  <button
                    className='btn btn-lg btn-primary btn-block text-uppercase'
                    type='submit'>
                    Sign in
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {isResetClicked && (
        <Modal show={isResetClicked}>
          <Modal.Header>Reset Your Password</Modal.Header>
          {/* <Modal.Close>X</Modal.Close> */}
          <Modal.Body>
            <div className='form-label-group pt-4 py-4'>
              <label htmlFor='inputEmail'>Email address</label>
              <input
                type='email'
                className='form-control'
                // id='inputEmail'
                placeholder='Enter Email..'
                required
                autoFocus
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>
            <div className='contanier'>
              <div className='row' style={{ justifyContent: "center" }}>
                <button
                  className='btn btn-md btn-secondary text-uppercase mr-2'
                  onClick={() => setIsResetClicked(false)}>
                  Cancel
                </button>
                <button
                  className='btn btn-md btn-primary text-uppercase'
                  type='button'
                  onClick={() => forgotPassword(resetEmail)}>
                  Reset
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
