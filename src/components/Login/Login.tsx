import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Element} from '../common/FormsControl/FormsControl'
import {required} from '../utilities/validators'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../redux/authReducer'
import {Redirect} from 'react-router-dom'
import styles from './../common/FormsControl/FormsControl.module.css'
import {AppStateType} from '../../redux/redux-store'

const Input = Element('input')

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder="email" name="email" component={Input} validate={[required]}/>
      </div>
      <div>
        <Field
          placeholder="password" name="password" component={Input} validate={[required]} type="password"/>
      </div>
      <div className={styles.rememberMe}>
        <span>remember me</span> <Field type="checkbox" name="rememberMe" component={Input}/>
      </div>
      <div>
        {props.error && <span className={styles.sumError}>{props.error}</span>}
      </div>
      <div>
        {props.captchaUrl && <span><img src={props.captchaUrl} alt=""/></span>}
        {props.captchaUrl && <div>
            <Field placeholder="enter symbols" name="captcha" component={Input} validate={[required]}/>
        </div>}
      </div>
      <div className={styles.btn}>
        <button className={styles.btn}>Login</button>
      </div>
    </form>
  )
}

const LoginFormRedux = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login'
})(LoginForm)

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export const LoginPage: React.FC = (props) => {

  const captchaUrl = useSelector((state: AppStateType) => state.authUser.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.authUser.isAuth)

  const dispatch = useDispatch()

  const onSubmit = ({email, password, rememberMe, captcha}: LoginFormValuesType) => {
    dispatch(login(email, password, rememberMe, captcha))
  }

  if (isAuth) return <Redirect to={'/profile'}/>

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <LoginFormRedux onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
  )
}
