import React, { useState } from 'react'
import { ip } from '../config'
import { Button, Modal, Form } from 'react-bootstrap'
import { MdModeEdit, MdClose, MdSave, MdCheck, MdRemoveRedEye } from 'react-icons/md'
import axios from 'axios'

export default function EditTask(props) {
  const taskId = props.taskId
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState(false)
  const [completed, setCompleted] = useState(props.isCompleted)
  const [description, setDescription] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => {
    requestData()
    setShow(true)
  }

  const requestData = () => {
    const urlRequest = `http://${ip}:3001/tasks/get/${taskId}`
    axios.get(urlRequest).then(res => {
      if (res.data.success) {
        const data = res.data.data[0]
        setTitle(data.title)
        setDescription(data.description)
        setCompleted(data.completed)
      } else {
        alert('Error web server 1')
      }
    }).catch(error => {
      alert('Error web server 2')
    })
  }

  const handleSubmit = (event) => {
    event.stopPropagation()

    if (!title) {
      return alert('Title field is required, please fill the title')
    }

    const data = { title, description }
    const urlRequest = `http://${ip}:3001/tasks/edit/${taskId}`

    axios.put(urlRequest, data).then(response => {
      if (response.data.success) {
        alert('Task updated successfully')
        window.location.reload()
      } else {
        alert('There was an error while creating the task, try again later')
      }
    }).catch(error => {
      alert(`Error: ${error}`)
    })
  }

  const markAsCompleted = () => {
    const urlRequest = `http://${ip}:3001/tasks/completed/${taskId}`

    axios.patch(urlRequest).then(response => {
      if (response.data.success) {
        alert('Task marked as completed successfully')
        window.location.reload()
      } else {
        alert('There was an error while completing the task, try again later')
      }
    }).catch(error => {
      alert(`Error: ${error}`)
    })
  }

  return (
    <>
      <Button variant="outline-info" className="btn-action" onClick={handleShow}>
        {completed ? <MdRemoveRedEye /> : <MdModeEdit />}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{!completed ? 'Edit' : 'View'} task</Modal.Title>
        </Modal.Header>
        <Form className="task">
          <Form.Group controlId="taskTitle" key="title">
            <Form.Label>Title (required)</Form.Label>
            <Form.Control type="text" value={title} onChange={val => setTitle(val.target.value)} placeholder="Task title" />
          </Form.Group>
          <Form.Group controlId="taskDescription" key="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" value={description} onChange={val => setDescription(val.target.value)} rows={3} placeholder="Task description..." />
          </Form.Group>
          <Modal.Footer>
            {!completed ?
              <>
                <Button variant="outline-info" onClick={markAsCompleted}>
                  <MdCheck className="mr-sm" />
                  Mark as completed
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  <MdClose className="mr-sm" />
                  Cancel
                </Button>
                <Button variant="success" type="button" disabled={completed} onClick={handleSubmit}>
                  Save
                  <MdSave className="ml-sm" />
                </Button>
              </> :
              <Button variant="light" onClick={handleClose}>
                <MdClose className="mr-sm" />
                Close
              </Button>
            }
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
