import classes from './ProfileInfo.module.css'
import {Element} from '../../common/FormsControl/FormsControl'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {required} from '../../utilities/validators'
import styles from '../../common/FormsControl/FormsControl.module.css'
import {ProfileType} from '../../../types/Types'

const Input = Element('input')
const TextArea = Element('textarea')

type PropsType = {
  profile: ProfileType
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = (props) => {

  return <form onSubmit={props.handleSubmit} className={classes.description}>

    <div>
      <b>Name:</b>
      <span>
        <Field name='fullName' component={Input} validate={[required]}/>
      </span>
    </div>
    <div>
      <b>About me:</b>
      <span>
        <Field name='aboutMe' component={TextArea} validate={[required]}/>
      </span>
    </div>
    <div>
      <div className={classes.contacts}>
        <b>Contacts:</b>
        {
          Object.keys(props.profile.contacts).map(key => {
            let name = 'contacts.' + key
            return <div key={key}>{key}:
              <Field name={name} component={Input}/>
            </div>
          })
        }
      </div>
      <div>
        <b>Looking for a job?</b>
        <span>
          <Field name='lookingForAJob' component={Input} type='checkbox'/>
        </span>
      </div>
      <div>
        <b>My professional skills:</b>
        <span>
          <Field name='lookingForAJobDescription' component={TextArea} validate={[required]}/>
        </span>
      </div>
      <div>
        {props.error && <span className={styles.sumError}>{props.error}</span>}
      </div>
      <div className={styles.btn}>
        <button>save</button>
      </div>

    </div>
  </form>
}

const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({
  form: 'editProfile'
})(ProfileDataForm)

export default ProfileDataFormRedux