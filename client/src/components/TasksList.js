import React, { useState, useEffect } from 'react'
import { Button, Modal, Form, Table } from 'react-bootstrap'
import { MdModeEdit, MdDeleteForever, MdCheckCircle, MdCheck } from 'react-icons/md'
import axios from 'axios'

function TasksList() {
  const [tasks, setTasks] = useState([])

  const requestData = () => {
    const urlRequest = 'http://192.168.1.118:3001/tasks'
    axios.get(urlRequest).then(res => {
      if (res.data.success) {
        const data = res.data.data
        setTasks(data)
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
        <tr>
          <td className="min-width">{d.completed ? <MdCheckCircle className="completed" /> : <MdCheck className="uncompleted" />} </td>
          <td>{d.title}</td>
          <td>{d.date}</td>
          <td>{`${d.description.substring(0, 100)}...`}</td>
          <td className="min-width"><Button variant="outline-info" className="btn-action"><MdModeEdit /></Button></td>
          <td className="min-width"><Button variant="outline-danger" className="btn-action"><MdDeleteForever /></Button></td>
        </tr>
      )
    })
  }

  return (
    <>
      <Table bordered hover responsive>
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
            <th>Edit</th>
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
