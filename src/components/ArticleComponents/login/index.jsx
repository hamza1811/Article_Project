import React, { useState } from "react";
import { connect } from "react-redux";
// import Swal from "sweetalert2";
import { authUser } from "../../../redux/ArticleUsers/user-action";
import { isUserAuthenticated } from "../../../redux/ArticleUsers/user-selectors";
import { isLoading } from "../../../redux/Article/article-selectors";

import { styles } from "../../../styles";
import ArticleLoading from "../Article/ArticleLoading";

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

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await props.authUser(email, password);
    if (result.status === 200) {
      showSuccessMessage();
    } else if (result.status === 400) {
      showErrorMessage(result.message);
    }
  };

  const showErrorMessage = (message) => {
    return Swal.fire("Oops!", message, "error");
  };

  const showSuccessMessage = () => {
    return Swal.fire("Success", "User Logged In Successfully", "success");
  };

  React.useEffect(() => {
    props.isAuthenticated && props.history.push("/");
  });

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
                <div className='custom-control custom-checkbox mb-3 pt-4'>
                  <input
                    type='checkbox'
                    className='custom-control-input'
                    id='customCheck1'
                  />
                  <label
                    className='custom-control-label'
                    htmlFor='customCheck1'>
                    Remember password
                  </label>
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
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
