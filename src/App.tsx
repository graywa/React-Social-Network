import './App.css'
import Navbar from './components/Navbar/Navbar'
import Music from './components/Music/Music'
import News from './components/News/News'
import Settings from './components/Settings/Settings'
import {Redirect, Route, Switch} from 'react-router-dom'
import React, {Component} from 'react'
import { UsersPage } from './components/Users/UsersPage'
import HeaderContainer from './components/Header/HeaderContainer'
import {LoginPage} from './components/Login/Login'
import {connect} from 'react-redux'
import {initializeApp} from './redux/appReducer'
import Preloader from './components/common/Preloader/Preloader'
import {withSuspense} from './components/HOC/withSuspense'
import {AppStateType} from './redux/redux-store'

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ChatPage = React.lazy(() => import('./components/Chat/ChatPage'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = { initializeApp: () => void }

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

class App extends Component <MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if (!this.props.initialized) return <Preloader />

    return (
      <div className="app-wrapper">
        <HeaderContainer/>
        <Navbar/>
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/profile"/>} />
            <Route path="/dialogs" render={() => <SuspendedDialogs/>} />
            <Route path="/profile/:userId?" render={() => <SuspendedProfile/>} />
            <Route path="/chat" render={() => <SuspendedChatPage/>} />
            <Route path="/users" render={() => <UsersPage/>} />
            <Route path="/login" render={() => <LoginPage/>} />
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

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

export default connect(mapStateToProps, {initializeApp})(App)

