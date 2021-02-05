import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'

function TasksList() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get('http://192.168.1.118:3001/tasks').then(res => {
      if (res.data.success) {
        const data = res.data.data
        setTasks(data)
      } else {
        alert('Error web server 1')
      }
    }).catch(error => {
      alert('Error web server 2')
    })
  }, [])

  const loadFillData = () => {
    return tasks.map(d => {
      return (
        <tr>
          <td>{d.completed}</td>
          <td>{d.title}</td>
          <td>{d.date}</td>
          <td>{d.description}</td>
        </tr>
      )
    })
  }

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Date</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {loadFillData()}
      </tbody>
    </Table>
  )
}

export default TasksList
