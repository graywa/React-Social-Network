import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {reduxForm, Field, InjectedFormProps} from 'redux-form'
import {required, maxLengthCreator} from '../utilities/validators'
import {Element} from '../common/FormsControl/FormsControl'
import {InitialStateType} from '../../redux/dialogsReducer'
import React from 'react'

const TextArea = Element('textarea')
const maxLength14 = maxLengthCreator(14)

type DialogsFormOwnPropsType = {}

const MessageForm: React.FC<InjectedFormProps<NewMessageFormType, DialogsFormOwnPropsType> & DialogsFormOwnPropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name='newMessage'
          component={TextArea}
          validate={[required, maxLength14]}
          placeholder='Hello'
        />
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

const MessageFormRedux = reduxForm<NewMessageFormType, DialogsFormOwnPropsType>({
  form: 'message'
})(MessageForm)

type NewMessageFormType = {
  newMessage: string
}
type OwnPropsType = {
  dialogsPage: InitialStateType
  sendMessage: (message: string) => void
}

const Dialogs: React.FC<OwnPropsType> = (props) => {

  let state = props.dialogsPage
  let dialogsElements = state.dialogsData
    .map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>)
  let messagesElements = state.messagesData
    .map(message => <Message message={message.message} key={message.id}/>)
  let onSendMessage = (values: NewMessageFormType) => {
    props.sendMessage(values.newMessage)
  }

  return (
    <div className={classes.dialogs}>
      <div className={classes.users}>
        {dialogsElements}
      </div>

      <div className={classes.messages}>
        <div>
          {messagesElements}
        </div>
        <div className={classes.newMessage}>
          <MessageFormRedux onSubmit={onSendMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default Dialogs