import './App.css'
import Navbar from "./components/Navbar/Navbar"
import Music from "./components/Music/Music"
import News from "./components/News/News"
import Settings from "./components/Settings/Settings"
import {Redirect, Route, Switch} from "react-router-dom"
import React, {Component} from "react"
import UsersContainer from "./components/Users/UsersContainer"
import HeaderContainer from "./components/Header/HeaderContainer"
import LoginPage from "./components/Login/Login"
import {connect} from "react-redux"
import {initializeApp} from "./redux/AppReducer"
import Preloader from "./components/common/Preloader/Preloader"
import {withSuspense} from "./components/HOC/withSuspense"

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

class App extends Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() {

    if (!this.props.initialized) return <Preloader />

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/profile'/>} />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/music" component={Music} />
            <Route path="/news" component={News} />
            <Route path="/settings" component={Settings} />
            <Route path="*" render={() => <div>404 page not found</div>} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default connect(mapStateToProps, {initializeApp})(App)
