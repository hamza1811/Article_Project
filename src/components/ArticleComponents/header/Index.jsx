import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  isUserLoggedIn,
  userSigingOut,
} from "../../../redux/ArticleUsers/user-action";

import { fetchAllArticles } from "../../../redux/Article/ArticleSelectors";
import "./index.css";

const mapStateToProps = (state) => {
  return {
    authName: state.user.loggedInUserData.displayName,
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
          <img
            src={process.env.PUBLIC_URL + "/logo192.png"}
            height='50'
            alt='logo'
          />
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
                <li className='nav-item'>
                  <a className='nav-link' onClick={signOutHandler}>
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
