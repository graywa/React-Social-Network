import React from "react"
import { Field, Form, Formik } from "formik"
import { FilterType } from "../../redux/usersReducer"
import { useSelector } from "react-redux"
import { getUsersFilter } from "../../redux/usersSelectors"

const usersSearchFormValidate = (values: any) => {
  const errors = {}        
  return errors
}

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}

type FormType = {
  term: string
  friend: 'null' | 'true' | 'false'
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {

  const filter = useSelector(getUsersFilter)
  
  const submit = (values: FormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {  
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
    }
    props.onFilterChanged(filter)  
    setSubmitting(false)      
  }

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{term: filter.term, friend: String(filter.friend) as 'null' | 'true' | 'false'}}
        validate={usersSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form style={{margin: '20px 0 0 20px'}}>
            <Field type='text' name='term' style={{padding: '3px 6px', width: '230px'}}/>
            <Field name='friend' as='select' style={{margin: '0 5px'}}>
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Without followed</option>
            </Field>            
            <button type='submit' disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
})