import React from 'react'
import { Card } from 'react-bootstrap'
import TasksList from './TasksList'

export default function Header() {
  return (
    <Card>
      <Card.Header>
        To do list
      </Card.Header>
      <Card.Body>
        <TasksList />
      </Card.Body>
    </Card>
  )
}
