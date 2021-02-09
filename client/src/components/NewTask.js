import React, { useState } from 'react'
import { ip } from '../config'
import { Button, Modal, Form } from 'react-bootstrap'
import { MdAddCircleOutline } from 'react-icons/md'
import axios from 'axios'

export default function NewTask() {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState(false)
  const [description, setDescription] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [titleReq, setTitleReq] = useState(false)

  const changeTitle = (value) => {
    setTitle(value)
    setTitleReq(!value)
  }

  const handleSubmit = (event) => {
    event.stopPropagation()

    if (!title) {
      setTitleReq(true)
      return alert('Title field is required, please fill the title')
    }

    const data = { title, description }
    const urlRequest = `http://${ip}:3001/tasks/create`

    axios.post(urlRequest, data).then(response => {
      if (response.data.success) {
        alert('Task created successfully')
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
        <Form className="task">
          <Form.Group controlId="taskTitle" key="title">
            <Form.Label>Title (required)</Form.Label>
            <Form.Control type="text" onChange={val => changeTitle(val.target.value)} placeholder="Task title" />
            {titleReq && <Form.Text id="titleRequired"> Required </Form.Text>}
          </Form.Group>
          <Form.Group controlId="taskDescription" key="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" onChange={val => setDescription(val.target.value)} rows={3} placeholder="Task description..." />
          </Form.Group>
          <Modal.Footer>
            <Button className="btn-grey" type="button" onClick={handleClose}>
              Cancel
          </Button>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
