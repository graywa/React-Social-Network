import React from 'react'
import {actionCreators} from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../HOC/withAuthRedirect'
import {compose} from 'redux'
import {reset} from 'redux-form'
import {AppStateType} from '../../redux/redux-store'

let mapStateToProps = (state: AppStateType) => ({
  dialogsPage: state.dialogsPage,
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    newMessageAC: actionCreators.newMessageAC
  }),
  withAuthRedirect
)(Dialogs)