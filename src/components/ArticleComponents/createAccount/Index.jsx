import React, { useState } from "react";
import { addUser } from "../../../redux/ArticleUsers/user-action";
import { connect } from "react-redux";
// import SweetAlert from 'sweetalert2-react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

function CreateAccount(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userObj = {
      email,
      name,
      password,
    };
    await props.addUser(userObj);
    resetForm();
    // In order to sign in user while creating account
    window.location.reload();
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
          <div className='card card-signin my-5'>
            <div className='card-body'>
              <h5 className='card-title text-center'>Sign Up</h5>
              <hr className='my-4' />
              <form className='form-signin' onSubmit={(e) => submitHandler(e)}>
                <div className='form-label-group pt-4'>
                  <label htmlFor='inputEmail'>Full Name</label>
                  {/* <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus /> */}
                  <input
                    type='text'
                    className='form-control'
                    id='inputName'
                    placeholder='Enter Name..'
                    required
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className='form-label-group pt-4'>
                  <label htmlFor='inputEmail'>Email address</label>
                  {/* <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus /> */}
                  <input
                    type='email'
                    className='form-control'
                    id='inputEmail'
                    placeholder='Enter Email..'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='form-label-group pt-4 password-wrapper'>
                  {/* <input type="password" id="inputPassword" className="form-control" placeholder="Password" required /> */}
                  <label htmlFor='inputPassword'>Password</label>
                  <input
                    type={passwordShown ? "text" : "password"}
                    className='form-control'
                    id='inputPassword'
                    placeholder='Enter Password...'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i className='eye-icon' onClick={togglePasswordVisiblity}>
                    <FontAwesomeIcon
                      icon={passwordShown ? faEyeSlash : faEye}
                    />
                  </i>
                </div>
                <button
                  className='btn btn-lg btn-primary btn-block text-uppercase mt-4'
                  type='submit'>
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(CreateAccount);
