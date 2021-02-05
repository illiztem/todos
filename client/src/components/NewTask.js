import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { MdAddCircleOutline, MdClose, MdSave } from 'react-icons/md'
import axios from 'axios'

export default function NewTask() {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState(false)
  const [description, setDescription] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  const handleSubmit = (event) => {
    event.stopPropagation()

    if (!title) {
      alert('Se debe llenar el Titulo')
    }

    const data = { title, description }
    const urlRequest = 'http://192.168.1.118:3001/tasks/create'

    axios.post(urlRequest, data).then(response => {
      if (response.data.success) {
        alert('Task created successfully')
      } else {
        alert('There was an error while creating the task, try again later')
      }
    }).catch(error => {
      alert(`Error: ${error}`)
    })
  }
  return (
    <>
      <Button id="btnNewTask" variant="primary" onClick={handleShow}>
        <MdAddCircleOutline className="mr-sm" />
        Add task
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New task</Modal.Title>
        </Modal.Header>
        <Form id="newTask">
          <Form.Group controlId="taskTitle" key="title">
            <Form.Label>Title (required)</Form.Label>
            <Form.Control type="text" onChange={val => setTitle(val.target.value)} placeholder="Task title" />
          </Form.Group>
          <Form.Group controlId="taskDescription" key="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" onChange={val => setDescription(val.target.value)} rows={3} placeholder="Task description..." />
          </Form.Group>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              <MdClose className="mr-sm" />
              Cancel
          </Button>
            <Button variant="success" type="button" onClick={handleSubmit}>
              Save
            <MdSave className="ml-sm" />
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
