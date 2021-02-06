import React, { useState, useEffect } from 'react'
import { ip } from '../config'
import { Button, Form, Table } from 'react-bootstrap'
import { MdCheckCircle, MdCheck } from 'react-icons/md'
import axios from 'axios'
import EditTask from './EditTask'
import ConfirmDelete from './ConfirmDelete'

function TasksList() {
  const [tasks, setTasks] = useState([])
  const [backupTasks, setBackupTasks] = useState([])
  const [filter, setFilter] = useState('')

  const requestData = () => {
    const urlRequest = `http://${ip}:3001/tasks`
    axios.get(urlRequest).then(res => {
      if (res.data.success) {
        const data = res.data.data
        setTasks(data)
        setBackupTasks(data)
      } else {
        alert('Error web server 1')
      }
    }).catch(error => {
      alert('Error web server 2')
    })
  }

  useEffect(requestData, [])

  const loadFillData = () => {
    return tasks.map(d => {
      return (
        <tr key={d.id}>
          <td className="min-width">{d.completed ? <MdCheckCircle className="completed" /> : <MdCheck className="uncompleted" />} </td>
          <td>{d.title}</td>
          <td>{d.date}</td>
          <td>{`${d.description.substring(0, 100)}...`}</td>
          <td className="min-width"><EditTask taskId={d.id} isCompleted={d.completed} /></td>
          <td className="min-width"><ConfirmDelete taskId={d.id} /></td>
        </tr>
      )
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

  const eraseFilter = () => {
    setFilter('')
    setTasks(backupTasks)
  }

  return (
    <>
      <Form inline>
        <Form.Label> Filter </Form.Label>
        <Form.Group>
          <Form.Control className="ml-sm" type="date" onChange={filterList} value={filter} />
        </Form.Group>
        <Button id="filter" variant="outline-info" onClick={eraseFilter}>Clean filter</Button>
      </Form>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Created on</th>
            <th>Description</th>
            <th>Edit/View</th>
            <th>Delete</th>
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
