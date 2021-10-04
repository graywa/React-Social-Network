import {actionCreators} from '../../redux/dialogsReducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../HOC/withAuthRedirect'
import {compose} from 'redux'
import {reset} from 'redux-form'

let mapStateToProps = (state) => ({
  dialogsPage: state.dialogsPage,
})

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessage) => {
      dispatch(actionCreators.newMessageActionCreator(newMessage))
      dispatch(reset('message'))
    }
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs)