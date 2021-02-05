import React from 'react'
import { Card } from 'react-bootstrap'
import NewTask from './NewTask'
import TasksList from './TasksList'

export default function Header() {
  return (
    <Card>
      <Card.Header>
        To do list
        <NewTask />
      </Card.Header>
      <Card.Body>
        <TasksList />
      </Card.Body>
    </Card>
  )
}
