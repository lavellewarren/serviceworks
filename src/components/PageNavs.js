import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'


Modal.setAppElement('#root');


export class PageNavs extends Component {

  static propTypes = {
    openExitModal: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    handleDeleteConfirmation: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired, 
    onDelete: PropTypes.func.isRequired, 
    payload:PropTypes.object.isRequired,
    allowDelete: PropTypes.bool.isRequired
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.openExitModal}
          onRequestClose={() => this.props.handleCloseModal()}
          shouldCloseOnOverlayClick={true}
        >
          <h3>You have unsaved changes</h3>
          <div className="button-wrapper">
            <button onClick={(e) => this.props.onSave(this.props.payload, e)}>save & close</button>
            <button onClick={() => this.props.handleCloseModal()}>cancel</button>
          </div>
        </Modal>
        <Modal
          isOpen={this.props.openDeleteModal}
          onRequestClose={() => this.props.handleCloseModal()}
          shouldCloseOnOverlayClick={true}
        >
          <h3>Are you sure you want to delete?</h3>
          <div className="button-wrapper">
            <button onClick={(e) => this.props.onDelete (this.props.payload.id, e)}>delete & close</button>
            <button onClick={() => this.props.handleCloseModal()}>cancel</button>
          </div>
        </Modal>
        <div className="tab-btn-group">
          <button
            className="btn second-btn btn-cancel "
            onClick={() => this.props.onCancel(this.props.payload)}>
            Back
            </button>
          {this.props.allowDelete &&
            <button
              className="btn second-btn btn-delete"
              onClick={(e) => this.props.handleDeleteConfirmation(this.props.payload, e)}>
              Delete
              </button>
          }
          <button
            className="btn second-btn btn-success"
            onClick={(e) => this.props.onSave(this.props.payload, e)}>
            Save job
            </button>
        </div>
      </div>
    )
  }
}