import React from 'react'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {Element} from '../common/FormsControl/FormsControl'
import {required} from '../utilities/validators'
import {connect} from 'react-redux'
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

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}

type DispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

const Login: React.FC<MapStatePropsType & DispatchPropsType> = (props) => {

  const onSubmit = ({email, password, rememberMe, captcha}: LoginFormValuesType) => {
    props.login(email, password, rememberMe, captcha)
  }

  if (props.isAuth) return <Redirect to={'/profile'}/>

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <LoginFormRedux onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    isAuth: state.authUser.isAuth,
    captchaUrl: state.authUser.captchaUrl
  }
}


export default connect(mapStateToProps, {login})(Login)