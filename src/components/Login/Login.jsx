import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Element} from '../common/FormsControl/FormsControl'
import {required} from '../utilities/validators'
import {connect} from 'react-redux'
import {login} from '../../redux/AuthReducer'
import {Redirect} from 'react-router-dom'
import styles from './../common/FormsControl/FormsControl.module.css'

const Input = Element('input')

const LoginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field placeholder='email' name='email' component={Input} validate={[required]} />
      </div>
      <div>
        <Field
          placeholder='password' name='password' component={Input} validate={[required]} type='password'/>
      </div>
      <div>
        <Field type='checkbox' name='rememberMe' component={Input}  /> remember me
      </div>
      <div >
        { props.error && <span className={styles.sumError}>{props.error}</span> }
      </div>
      <div>
        {props.captchaUrl && <span><img src={props.captchaUrl} alt=""/></span>}
        {props.captchaUrl && <div>
          <Field placeholder='enter symbols' name='captcha' component={Input} validate={[required]} />
        </div>}
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginFormRedux = reduxForm({
  form: 'login'
}) (LoginForm)

const Login = (props) => {

  const onSubmit = ({email, password, rememberMe, captcha}) => {
    props.login(email, password, rememberMe, captcha)
  }

  if(props.isAuth) return <Redirect to={'/profile'} />

  return (
    <div>
      <h1>Login</h1>
      <LoginFormRedux onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.authUser.isAuth,
    captchaUrl: state.authUser.captchaUrl
  }
}


export default connect ( mapStateToProps, {login} ) (Login)