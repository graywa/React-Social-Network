import {useEffect, useState} from 'react'


const ProfileStatusWithHooks = (props) => {

  let [editMode,  setEditMode] = useState(false)
  let [status,  setStatus] = useState(props.status)

  useEffect(
    () => {
      setStatus(props.status)
    },
    [props.status]
  )

  const onEditMode = () => {
    if(props.isOwner) {
      setEditMode(true)
    }
  }

  const offEditMode = () => {
    setEditMode(false)
    props.updateUserStatus(status)
  }

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value)
  }

  return (
    <div>
      {editMode
      ? <div>
          <input
            onBlur={offEditMode}
            autoFocus={true}
            type="text"
            value={status}
            onChange={onStatusChange}
          />
        </div>
      :  <div onDoubleClick={onEditMode} >
          <span><b>Status:</b> {props.status}</span>
        </div>
      }
    </div>
  )
}

export default ProfileStatusWithHooks