import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  isUserLoggedIn,
  userSigingOut,
} from "../../../redux/ArticleUsers/user-action";

import { fetchAllArticles } from "../../../redux/Article/article-selectors";
import "./index.css";

const mapStateToProps = (state) => {
  return {
    authName: state.user.loggedInUserData.displayName,
    isAdminRole: state.user.isAdmin,
    uid: state.user.loggedInUserData.uid,
    Articles: fetchAllArticles(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    isUserLoggedIn: () => dispatch(isUserLoggedIn()),
    userSigingOut: () => dispatch(userSigingOut()),
  };
};

function Header(props) {
  const { isUserLoggedIn } = props;
  const [searchedArticlesByTitle, setSearchedArticlesByTitle] = React.useState(
    []
  );

  const searchHandler = (title) => {
    const { Articles } = props;
    if (title.length > 0) {
      const searchedArticles = Articles.filter(
        (Article) =>
          Article.ArticleTitle.toLowerCase().indexOf(title.toLowerCase()) > -1
      );
      setSearchedArticlesByTitle(searchedArticles);
    } else {
      setSearchedArticlesByTitle([]);
    }
  };

  React.useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);

  const signOutHandler = () => {
    props.userSigingOut();
  };

  const suggestionLinkClickHandler = () => {
    setSearchedArticlesByTitle([]);
  };

  return (
    <div className='shadow p-3 mb-5 bg-white rounded'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to='/'>
          <div
            className='css-thlpjf'
            style={{
              backgroundColor: "rgb(66, 74, 89)",
              borderRadius: "5px",
              height: "auto",
              width: "120px",
            }}>
            <svg
              viewBox='0 0 283.1000007020103 64.8'
              height='64.8'
              width='283.1000007020103'
              style={{
                width: "100%",
                height: "auto",
                // transform: "translate(-50%, -50%) scale(0.769339)",
                zIndex: 0,
                padding: "5px",
                cursor: "pointer",
              }}>
              <defs id='SvgjsDefs1203' />
              <g
                id='SvgjsG1204'
                featurekey='symbolFeature-0'
                transform='matrix(0.14672770075422853,0,0,0.14672770075422853,-1.6052015444036254,-5.232547108532675)'
                fill='#ffffff'>
                <g xmlns='http://www.w3.org/2000/svg'>
                  <path d='M486.23,164.363c-16.308-60.024-41.522-108.75-65.856-127.312c-0.013-0.01-0.025-0.02-0.038-0.03   c-0.064-0.049-0.13-0.105-0.194-0.154c-0.021-0.016-0.044-0.025-0.065-0.041c-0.241-0.177-0.493-0.337-0.757-0.476   c-0.05-0.026-0.101-0.048-0.15-0.073c-0.266-0.13-0.537-0.247-0.818-0.336c-0.026-0.009-0.053-0.014-0.079-0.021   c-0.267-0.081-0.54-0.141-0.817-0.185c-0.048-0.008-0.096-0.018-0.144-0.024c-0.285-0.038-0.573-0.052-0.863-0.049   c-0.054,0.001-0.106,0.002-0.16,0.005c-0.291,0.011-0.583,0.04-0.875,0.095c-0.032,0.006-0.064,0.016-0.098,0.023   c-0.266,0.055-0.529,0.13-0.792,0.223c-0.047,0.017-0.095,0.031-0.142,0.048c-0.027,0.011-0.055,0.017-0.081,0.028   c-0.252,0.101-0.489,0.222-0.72,0.352c-0.046,0.026-0.091,0.053-0.136,0.08c-0.27,0.161-0.524,0.337-0.761,0.534   c-0.005,0.004-0.011,0.007-0.016,0.011c-0.057,0.047-0.115,0.108-0.172,0.157c-0.069,0.064-0.143,0.125-0.209,0.192   c-12.001,10.684-28.941,54.203-40.471,104.113c-8.335,36.083-20.637,105.187-9.381,162.586c8.387,42.765,28.1,69.959,58.602,80.901   c-1.539,11.187-3.201,22.262-4.976,33.146c-3.892-5.198-9.052-11.462-15.412-17.825c-6.564-6.571-12.909-6.959-17.079-6.123   c-10.573,2.116-20.387,14.519-29.999,37.912c-0.696,1.689-1.328,2.301-1.478,2.375c-0.021,0.009-2.262,0.312-8.387-5.285   c-4.741-4.332-9.882-10.43-14.417-15.81c-4.216-5.001-7.857-9.32-10.935-12.042c-4.02-3.578-9.211-5.104-15.005-4.417   c-13.655,1.623-28.646,15.141-37.455,27.832c-1.729,2.507-3.1,2.524-3.758,2.532c-0.017,0-0.033,0-0.05,0   c-2.31,0-10.979-1.962-28.646-26.264c-2.5-3.437-6.115-5.322-10.197-5.322c-0.058,0-0.116,0.001-0.174,0.001   c-14.036,0.185-31.652,24.222-36.717,31.585c-1.878,2.73-1.188,6.466,1.543,8.344c2.729,1.879,6.465,1.188,8.344-1.543   c0.053-0.077,5.361-7.765,11.983-14.978c10.955-11.933,15.144-11.412,15.167-11.402c0.001,0,0.13,0.077,0.345,0.373   c15.263,20.995,27.81,31.206,38.348,31.206c0.067,0,0.134,0,0.201-0.001c3.757-0.047,9.146-1.424,13.478-7.704   c8.322-11.989,20.791-21.767,29.003-22.742c3.137-0.377,4.703,0.656,5.624,1.476c2.434,2.152,5.975,6.354,9.725,10.801   c10.523,12.483,21.384,25.368,31.892,25.367c0.646,0,1.291-0.049,1.934-0.149c3.29-0.514,7.822-2.607,10.729-9.668   c10.99-26.748,19.049-30.269,21.257-30.71c0.772-0.156,2.833-0.567,6.234,2.838c14.09,14.098,22.007,27.979,22.083,28.113   c0.001,0.001,0.002,0.003,0.003,0.004c0.098,0.174,0.204,0.343,0.319,0.506c0.045,0.064,0.096,0.123,0.143,0.185   c0.071,0.094,0.141,0.188,0.217,0.276c0.067,0.079,0.142,0.151,0.213,0.227c0.063,0.066,0.124,0.135,0.19,0.198   c0.07,0.068,0.146,0.129,0.22,0.193c0.075,0.064,0.147,0.132,0.226,0.192c0.065,0.051,0.134,0.097,0.2,0.145   c0.094,0.066,0.186,0.135,0.283,0.196c0.054,0.034,0.11,0.063,0.165,0.097c0.114,0.067,0.229,0.135,0.348,0.194   c0.042,0.021,0.085,0.038,0.128,0.059c0.133,0.063,0.267,0.126,0.406,0.18c0.034,0.013,0.069,0.022,0.104,0.034   c0.212,0.078,0.431,0.143,0.655,0.196c0.119,0.029,0.237,0.061,0.357,0.082c0.005,0,0.01,0.002,0.015,0.003   c0.012,0.002,0.022,0.001,0.034,0.003c0.303,0.052,0.611,0.076,0.92,0.081c0.03,0,0.061,0.008,0.09,0.008   c0.014,0,0.026-0.003,0.04-0.004c0.302-0.002,0.604-0.032,0.906-0.08c0.061-0.01,0.121-0.019,0.181-0.029   c0.284-0.055,0.565-0.132,0.844-0.229c0.063-0.021,0.125-0.046,0.188-0.07c0.264-0.103,0.524-0.218,0.778-0.36   c0.009-0.005,0.018-0.012,0.026-0.017c0.032-0.019,0.062-0.04,0.093-0.059c0.251-0.148,0.485-0.314,0.706-0.492   c0.033-0.026,0.067-0.051,0.1-0.077c0.234-0.197,0.447-0.412,0.646-0.638c0.034-0.04,0.068-0.08,0.103-0.12   c0.192-0.232,0.367-0.477,0.521-0.732c0.026-0.045,0.051-0.092,0.077-0.138c0.152-0.271,0.288-0.55,0.397-0.839   c0.012-0.031,0.021-0.064,0.032-0.097c0.114-0.32,0.206-0.648,0.265-0.983c2.69-15.324,5.154-31.128,7.373-47.155   c30.573-2.702,52.133-22.949,62.35-58.557C506.836,288.421,503.602,228.301,486.23,164.363z M374.212,301.799   c-10.828-55.212,1.177-122.425,9.297-157.576c9.563-41.397,22.147-75.075,31.121-90.317c14.256,42.094,20.83,103.71,19.04,179.3   c-1.033,43.668-4.917,92.31-11.007,139.587C397.777,362.747,381.486,338.896,374.212,301.799z M483.569,325.997   c-8.54,29.76-25.079,46.429-49.172,49.607c6.237-48.096,10.217-97.656,11.27-142.115c1.634-69-3.34-125.144-14.796-167.459   c16.429,23.166,32.457,59.806,43.779,101.478C491.216,228.482,494.55,287.729,483.569,325.997z' />
                  <path d='M155.263,393.419l-27.887-22.082c5.832-1.139,10.249-6.282,10.249-12.444v-14.918c0-6.993-5.688-12.683-12.68-12.683   H43.858c-7.004,0-12.703,5.689-12.703,12.683v14.918c0,6.156,4.417,11.297,10.25,12.441l-28.189,22.318   c-0.011,0.009-0.02,0.02-0.03,0.028c-0.214,0.172-0.413,0.359-0.602,0.558c-0.042,0.045-0.082,0.09-0.123,0.136   c-0.182,0.204-0.354,0.416-0.507,0.645c-0.007,0.011-0.013,0.022-0.02,0.033c-0.147,0.222-0.276,0.457-0.393,0.698   c-0.021,0.044-0.043,0.087-0.063,0.132c-0.113,0.249-0.211,0.506-0.29,0.772c-0.009,0.03-0.015,0.061-0.023,0.091   c-0.066,0.237-0.117,0.481-0.154,0.729c-0.008,0.053-0.017,0.104-0.023,0.157c-0.029,0.238-0.048,0.479-0.048,0.726v72.939   c0,3.313,2.687,6,6,6h134.896c3.314,0,6-2.687,6-6v-72.543c0.009-0.132,0.02-0.263,0.02-0.396   C157.855,396.31,156.829,394.501,155.263,393.419z M43.155,343.975c0-0.37,0.322-0.683,0.703-0.683h81.087   c0.362,0,0.68,0.319,0.68,0.683v14.918c0,0.364-0.318,0.684-0.68,0.684H110.47c-0.004,0-0.008-0.001-0.012-0.001H58.345   c-0.004,0-0.008,0.001-0.012,0.001H43.858c-0.381,0-0.703-0.313-0.703-0.684V343.975z M60.436,371.576h47.931l26.227,20.781H34.191   L60.436,371.576z M145.835,465.297H22.939v-60.939h122.896V465.297z' />
                </g>
              </g>
              <g
                id='SvgjsG1205'
                featurekey='nameLeftFeature-0'
                transform='matrix(2.5714285714285716,0,0,2.5714285714285716,90.97142955235073,-0.4285714285714306)'
                fill='#ffffff'>
                <path d='M12.38 20 l-1.06 -2.5 l-6.76 0 l-1.06 2.5 l-3.1 0 l6.22 -14 l2.64 0 l6.24 14 l-3.12 0 z M5.58 15.120000000000001 l4.72 0 l-2.36 -5.54 z M28.12 20 l-3.1 0 l-2.98 -4.66 l-0.04 0 l-1.98 0 l0 4.66 l-2.92 0 l0 -14 l4.9 0 c3.14 0 5.18 1.9 5.18 4.76 c0 1.9 -0.92 3.32 -2.48 4.04 z M20.02 8.68 l0 4.14 l1.8 0 c1.44 0 2.44 -0.56 2.44 -2.06 c0 -1.48 -1 -2.08 -2.44 -2.08 l-1.8 0 z M39.42 6 l0 2.68 l-3.48 0 l0 11.32 l-2.92 0 l0 -11.32 l-3.5 0 l0 -2.68 l9.9 0 z' />
              </g>
              <g
                id='SvgjsG1206'
                featurekey='nameRightFeature-0'
                transform='matrix(2.500000066227385,0,0,2.500000066227385,195.99999980131784,0.49999675485814166)'
                fill='#ffffff'>
                <path d='M1.78 6 l0 14 l-0.58 0 l0 -14 l0.58 0 z M15.56 18.5 c-1.3 1.08 -2.9 1.7 -4.62 1.7 c-3.44 0 -7.06 -2.98 -7.06 -7.2 s3.62 -7.2 7.06 -7.2 c1.7 0 3.28 0.6 4.58 1.66 l-0.4 0.46 c-1.18 -1 -2.64 -1.52 -4.12 -1.52 c-3.16 0 -6.54 2.68 -6.54 6.6 s3.38 6.6 6.54 6.6 c1.48 0 2.96 -0.52 4.12 -1.5 z M18.040000000000003 19.42 l6.94 0 l0 0.58 l-7.52 0 l0 -14 l0.58 0 l0 13.42 z M27.560000000000002 19.42 l7.28 0 l0 0.58 l-7.68 0 l-0.18 0 l0 -14 l0.58 0 l7.1 0 l0 0.58 l-7.1 0 l0 6.1 l5.66 0 l0 0.58 l-5.66 0 l0 6.16 z' />
              </g>
            </svg>
          </div>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div
          className='collapse navbar-collapse header-wrapper'
          id='navbarSupportedContent'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
                Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            {!props.authName ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/create-account'>
                    Create Account
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/add-article'>
                    Add Article
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/my-profile'>
                    {/* <AuthName /> */}
                    {props.authName}
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to={`/your-articles/${props.uid}`}>
                    Your Articles
                  </Link>
                </li>
                {props.isAdminRole && (
                  <li className='nav-item'>
                    <Link className='nav-link' to={`/pending-article`}>
                      Pending Articles
                    </Link>
                  </li>
                )}
                <li className='nav-item'>
                  <a
                    className='nav-link'
                    onClick={signOutHandler}
                    href='/'
                    style={{ cursor: "pointer" }}>
                    Log Out
                  </a>
                </li>
              </>
            )}
          </ul>
          <div className='form-inline my-2 my-lg-0 search-wrapper'>
            <input
              className='form-control'
              type='search'
              placeholder='Search'
              aria-label='Search'
              onChange={(e) => searchHandler(e.target.value)}
              // value={searchedArticlesByTitle.length === 0 ? ""  }
            />
            <div
              className={
                searchedArticlesByTitle.length > 0
                  ? "show-autoComplete-wrapper"
                  : "hide-autoComplete-wrapper"
              }>
              <ul className='ArticleSuggestion__List'>
                {searchedArticlesByTitle.map((Article) => (
                  <li className='ArticleSuggestion__Title'>
                    <Link
                      onClick={suggestionLinkClickHandler}
                      to={`/full-article/${Article.id}`}
                      className='link-light'>
                      {Article.ArticleTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* {suggestionsArticleListComponent} */}
          </div>
        </div>
      </nav>
    </div>
  );
}
// export profileUpdated;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
