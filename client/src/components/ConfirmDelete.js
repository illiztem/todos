import React, { useState } from 'react'
import { ip } from '../config'
import { Button, Modal } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'
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
        alert(response.data.msg)
      }
    }).catch(error => {
      alert(`Error: ${error}`)
    })
  }

  return (
    <>
      <Button className="btn-grey" type="button" onClick={handleShow}>
        <MdDeleteForever className="mr-sm" />
        Delete
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
          <Button className="btn-grey" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
