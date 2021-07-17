import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobile } from "@fortawesome/free-solid-svg-icons";
import { addUser } from "../../../redux/ArticleUsers/user-action";
import { connect } from "react-redux";
// import SweetAlert from 'sweetalert2-react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

function CreateAccount(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const userObj = {
      email,
      name,
      password,
    };
    props.addUser(userObj);

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
                <div className='form-label-group pt-4'>
                  {/* <input type="password" id="inputPassword" className="form-control" placeholder="Password" required /> */}
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
                    Agreed Terms & Condition
                  </label>
                </div>
                <button
                  className='btn btn-lg btn-primary btn-block text-uppercase'
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
