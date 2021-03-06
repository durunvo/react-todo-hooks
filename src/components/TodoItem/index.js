import React from 'react';
import Checkbox from 'antd/lib/checkbox';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

export default ({ todo, toggleTodo, editTodo, deleteTodo }) => (
  <Row type="flex" gutter={8}>
    <Col>
      <Checkbox
        checked={todo.completed}
        onChange={e => toggleTodo(todo.id, e.target.checked)}
      />
    </Col>
    <Col>
      <Input
        size="small"
        value={todo.text}
        onChange={e => editTodo(todo.id, e.target.value)}
      />
    </Col>
    <Col>
      <Button
        block
        size="small"
        type="danger"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </Button>
    </Col>
  </Row>
);
