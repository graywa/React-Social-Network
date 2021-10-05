import React from 'react'

class ProfileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  }

  onEdit = () => {
    this.setState({
      editMode: true,
    })
  }

  offEdit = () => {
    this.setState({
      editMode: false,
    })
    this.props.updateUserStatus(this.state.status)
  }

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.editMode ? (
          <div>
            <input
              onBlur={this.offEdit}
              autoFocus={true}
              type='text'
              value={this.state.status}
              onChange={this.onStatusChange}
            />
          </div>
        ) : (
          <div onDoubleClick={this.onEdit}>
            <span>{`Статус: ${this.props.status}`}</span>
          </div>
        )}
      </div>
    )
  }
}

export default ProfileStatus



