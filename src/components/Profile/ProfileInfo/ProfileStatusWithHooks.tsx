import React, {ChangeEvent, useEffect, useState} from 'react'


type PropsType = {
  status: string
  isOwner: boolean
  updateUserStatus: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

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

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      : (props.isOwner && <div onDoubleClick={onEditMode} title='double click to change'>
          <span><b>Status:</b> {props.status}</span>
        </div>)
        || <div> <span><b>Status:</b> {props.status}</span></div>
      }
    </div>
  )
}

export default ProfileStatusWithHooks





