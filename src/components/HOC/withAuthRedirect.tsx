import {Redirect} from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'
import {AppStateType} from '../../redux/redux-store'

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.authUser.isAuth
})

type MapPropsType = {
  isAuth: boolean
}

export function withAuthRedirect(Component: React.ComponentType) {
  class RedirectComponent extends React.Component<MapPropsType> {
    render() {
      if (!this.props.isAuth) return <Redirect to={'/login'}/>
      return <Component {...this.props} />
    }
  }
  return connect(mapStateToPropsForRedirect)(RedirectComponent)
}


// export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
//   class RedirectComponent (props: WCP & MapPropsType) {
//     if (!props.isAuth) return <Redirect to={'/login'}/>
//     return <Component {...props} />
//   }
//
//   // @ts-ignore
//   let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
//   return ConnectedAuthRedirectComponent
// }
