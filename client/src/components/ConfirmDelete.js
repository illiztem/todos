import React, { useState } from 'react'
import { ip } from '../config'
import { Button, Modal } from 'react-bootstrap'
import { MdClose, MdDeleteForever } from 'react-icons/md'
import axios from 'axios'

export default function ConfirmDelete(props) {
  const taskId = props.taskId
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const confirmDelete = () => {
    const urlRequest = `http://${ip}:3001/tasks/delete/${taskId}`

    axios.delete(urlRequest).then(response => {
      if (response.data.success) {
        alert('Task deleted successfully')
        window.location.reload()
      } else {
        alert('There was an error while deleting the task, try again later')
      }
    }).catch(error => {
      alert(`Error: ${error}`)
    })
  }

  return (
    <>
      <Button variant="outline-danger" className="btn-action" onClick={handleShow}>
        <MdDeleteForever />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Warning! Deleting task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This action is irreversible. Do you want to delete the task? </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            <MdClose className="mr-sm" />
            No
          </Button>
          <Button variant="success" onClick={confirmDelete}>
            <MdDeleteForever className="mr-sm" />
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
