import React, { useState, useEffect } from 'react'
import { ip } from '../config'
import { Col, Container, Form, Row, Table } from 'react-bootstrap'
import { MdCheck } from 'react-icons/md'
import axios from 'axios'
import EditTask from './EditTask'
import NewTask from './NewTask'

function TasksList() {
  const [tasks, setTasks] = useState([])
  const [backupTasks, setBackupTasks] = useState([])
  const [filter, setFilter] = useState('')
  const [taskId, setTaskId] = useState(false)

  const requestData = () => {
    const urlRequest = `http://${ip}:3001/tasks`
    axios.get(urlRequest).then(res => {
      if (res.data.success) {
        const data = res.data.data
        setTasks(data)
        setBackupTasks(data)
      } else {
        alert(res.data.msg)
      }
    }).catch(error => {
      alert(`Error: ${error}`)
    })
  }

  const noData = () => {
    return (
      <tr>
        <td colSpan="4" className="no-data"> Task list is empty, create one </td>
      </tr>
    )
  }

  useEffect(requestData, [])

  const loadFillData = () => {
    if (tasks.length === 0) {
      return noData()
    }

    return tasks.map(d => {
      return (
        <tr key={d.id} className="pointer">
          <td onClick={() => markAsCompleted(d.completed, d.id)} className="min-width"><MdCheck className={d.completed ? 'completed' : 'uncompleted'} /> </td>
          <td onClick={() => setTaskId(d.id)}>{d.title}</td>
          <td onClick={() => setTaskId(d.id)}>
            {
              new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(Date.parse(d.date)).replaceAll(' ', '/')
            }
          </td>
          <td onClick={() => setTaskId(d.id)} className='min-table'>{`${d.description.substring(0, 100)}...`}</td>
        </tr>
      )
    })
  }

  const markAsCompleted = (isCompleted, id) => {
    if (isCompleted) {
      return
    }

    const urlRequest = `http://${ip}:3001/tasks/completed/${id}`

    axios.patch(urlRequest).then(response => {
      if (response.data.success) {
        alert('Task marked as completed successfully')
        window.location.reload()
      } else {
        alert(response.data.msg)
      }
    }).catch(error => {
      alert(`Error: ${error}`)
    })
  }


  const filterList = (event) => {
    const filterDate = event.target.value
    setFilter(filterDate)

    let updatedList = backupTasks
    updatedList = updatedList.filter(list => {
      return (
        list.date.search(filterDate) !== -1
      )
    })

    setTasks(updatedList)
  }

  const renderEditTask = () => {
    return (
      <EditTask taskId={taskId} show={true} />
    )
  }

  return (
    <>
      <Container>
        <Row>
          <Col sm={3} xs={12} className="bold">Tasks</Col>
          <Col sm={9} xs={12} id="taskActions">
            <Form inline>
              <Form.Group>
                <Form.Control id="filterDate" className="ml-sm" type="date" onChange={filterList} value={filter} />
              </Form.Group>
              <Form.Group>
                <NewTask />
                {taskId && renderEditTask()}
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Created</th>
            <th className="min-table">Description</th>
          </tr>
        </thead>
        <tbody>
          {loadFillData()}
        </tbody>
      </Table>
    </>
  )
}

export default TasksList
