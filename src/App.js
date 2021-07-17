import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from './components/ArticleComponents/home/Index';
import AddArticle from './components/ArticleComponents/Article/Index';
import Header from './components/ArticleComponents/header/Index';
import Footer from './components/ArticleComponents/footer/Index';
import FullArticle from './components/ArticleComponents/Article/FullArticle';
import Login from './components/ArticleComponents/login';
import CreateAccount from './components/ArticleComponents/createAccount/Index';
import MyProfile from './components/ArticleComponents/profile';
import PrivateRoute from './components/PrivateRoute';
import { connect } from 'react-redux';
import YourArticles from './components/ArticleComponents/profile/YourArticles';
import EditArticle from './components/ArticleComponents/Article/EditArticle';
import "./App.css";
import ScrollToTop from './components/ScrollToTop';
const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.loggedInUserName
  }
}
function App({ isAuthenticated }) {
  return (
    <div className="body-class">
      <Header />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/full-article/:id" component={FullArticle} />
          {/* <Route exact path="/add-article" component={AddArticle} /> */}
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/create-account" component={CreateAccount} /> */}
          {/* <Route exact path="/my-profile" component={MyProfile} /> */}
          <PrivateRoute
            path="/add-article"
            component={AddArticle}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/my-profile"
            component={MyProfile}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/create-account"
            component={CreateAccount}
            isAuthenticated={isAuthenticated === "" && true}
          />
          <PrivateRoute
            path="/your-articles/:id"
            component={YourArticles}
            isAuthenticated={isAuthenticated}
          />
          <PrivateRoute
            path="/edit-article/:id"
            component={EditArticle}
            isAuthenticated={isAuthenticated}
          />
        </Switch>
      </ScrollToTop>
      <Footer />
    </div>
  )
}

export default connect(mapStateToProps)(App)
