import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import {reduxForm, Field} from "redux-form"
import {required, maxLengthCreator} from "../utilities/validators"
import {Element} from "../common/FormsControl/FormsControl"

const TextArea = Element('textarea')

const maxLength14 = maxLengthCreator(14)

const MessageForm = (props) => {
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

const MessageFormRedux = reduxForm({
  form: 'message'
})(MessageForm)

const Dialogs = (props) => {

  let state = props.dialogsPage

  let dialogsElements = state.dialogsData
    .map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>)

  let messagesElements = state.messagesData
    .map(message => <Message message={message.message} key={message.id}/>)

  let onSendMessage = (values) => {
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
          <MessageFormRedux
            onSubmit={onSendMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default Dialogs