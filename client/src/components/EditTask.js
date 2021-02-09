import React, { useEffect, useState } from 'react'
import { ip } from '../config'
import { Button, Modal, Form } from 'react-bootstrap'
import { MdModeEdit } from 'react-icons/md'
import axios from 'axios'
import ConfirmDelete from './ConfirmDelete'

export default function EditTask(props) {
  const taskId = props.taskId
  const [task, setTask] = useState({})
  const [show, setShow] = useState(true)
  const [titleReq, setTitleReq] = useState(false)
  const [edit, setEdit] = useState(false)
  const handleClose = () => window.location.reload()

  const handleShow = () => {
    requestData()
    setShow(true)
  }

  useEffect(handleShow, [])

  const requestData = () => {
    const urlRequest = `http://${ip}:3001/tasks/get/${taskId}`
    axios.get(urlRequest).then(res => {
      if (res.data.success) {
        const data = res.data.data[0]
        setTask(data)
      } else {
        alert(res.data.msg)
      }
    }).catch(error => {
      alert(`Error: ${error}`)
    })
  }

  const handleSubmit = (event) => {
    event.stopPropagation()

    if (!task.title) {
      setTitleReq(true)
      return alert('Title field is required, please fill the title')
    }

    const urlRequest = `http://${ip}:3001/tasks/edit/${taskId}`
    const data = {
      title: task.title,
      description: task.description
    }

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

  const setTaskTitle = (title) => {
    const tempTask = { ...task }
    tempTask.title = title
    setTask(tempTask)
  }

  const setTaskDescription = (description) => {
    const tempTask = { ...task }
    tempTask.description = description
    setTask(tempTask)
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit task' : task.title}</Modal.Title>
        </Modal.Header>
        <Form className="task">
          <Form.Group>
            <Form.Control as="select">
              <option>Status: pending</option>
              <option selected={task.completed}>Status: completed</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="taskTitle" key="title">
            <Form.Label>Created</Form.Label>
            <br />
            <Form.Text>
              {
                new Intl.DateTimeFormat("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit"
                }).format(Date.parse(task.date)).replaceAll(' ', '/')
              }
            </Form.Text>
          </Form.Group>
          {edit ?
            <Form.Group controlId="taskTitle" key="title">
              <Form.Label>Title (required)</Form.Label>
              <Form.Control type="text" value={task.title} onChange={val => setTaskTitle(val.target.value)} placeholder="Task title" />
              {titleReq && <Form.Text id="titleRequired"> Required </Form.Text>}
            </Form.Group>
            :
            ''
          }
          <Form.Group controlId="taskDescription" key="description">
            <Form.Label>Description</Form.Label>
            {edit ?
              <Form.Control as="textarea" value={task.description} onChange={val => setTaskDescription(val.target.value)} rows={3} placeholder="Task description..." />
              :
              <Form.Text>{task.description}</Form.Text>
            }
          </Form.Group>
          <Modal.Footer>
            {edit ?
              <>
                <Button className="btn-grey" type="button" onClick={handleClose}>
                  Cancel
                </Button>
                <Button className="btn-grey" type="button" onClick={handleSubmit}>
                  Save
                </Button>
              </> : <>
                <Button className="btn-grey" type="button" onClick={() => setEdit(true)}>
                  <MdModeEdit className="mr-sm" />
                  Edit
                </Button>
                <ConfirmDelete taskId={taskId} />
              </>
            }
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
