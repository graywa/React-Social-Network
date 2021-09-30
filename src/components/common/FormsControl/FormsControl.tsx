import styles from './FormsControl.module.css'
import React from "react"
import {WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form"


type ElementPropsType = {
  meta: WrappedFieldMetaProps
  //input: WrappedFieldInputProps
  input: {}

}

type ElementType = (props: ElementPropsType) => React.ReactNode

export const Element = (Element: string): ElementType => ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error
  // @ts-ignore
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div >
        {hasError ? <span className={styles.messageError}>{hasError}</span> : ''}
      </div>
      <Element {...input} {...props} />
    </div>
  )
}