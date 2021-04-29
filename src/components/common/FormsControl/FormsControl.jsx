import React from 'react'
import styles from './FormsControl.module.css'


export const Element = (Element) => ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div >
        {hasError ? <span className={styles.messageError}>{hasError}</span> : ''}
      </div>
      <Element {...input} {...props} />
    </div>
  )
}