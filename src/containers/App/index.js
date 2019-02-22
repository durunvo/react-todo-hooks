import React, { useState } from 'react';
import TodoItem from '../../components/TodoItem';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import List from 'antd/lib/list';
import Radio from 'antd/lib/radio';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Progress from 'antd/lib/progress';

const SHOW_ALL = 'SHOW_ALL';
const SHOW_COMPLETED = 'SHOW_COMPLETED';
const SHOW_ACTIVE = 'SHOW_ACTIVE';
let nextTodo = 0;

function App() {

  const [textInput, setTextInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [visibility, setVisibility] = useState(SHOW_ALL);

  const getVisibleTodos = (todos, filter) => {
    switch (filter) {
      case SHOW_ALL:
        return todos.filter(t => !t.deleted);
      case SHOW_COMPLETED:
        return todos.filter(t => t.completed && !t.deleted);
      case SHOW_ACTIVE:
        return todos.filter(t => !t.completed && !t.deleted);
      default:
        throw new Error('Unknown filter: ' + filter);
    }
  }

  const progressTodo = () => {
    const todoWithOutDeletion = todos.filter(t => !t.deleted);
    return parseInt(getVisibleTodos(todoWithOutDeletion, SHOW_COMPLETED).length * 100/ getVisibleTodos(todoWithOutDeletion, SHOW_ALL).length);
  };

  const toggleTodo = (id, checked) => {
    setTodos(todos.map(todo => {
      return todo.id === id ? { ...todo, completed: checked } : todo;
    }))
  };

  const deleteTodo = (id) => {
    setTodos(todos.map(todo => {
      return todo.id === id ? { ...todo, deleted: true } : todo;
    }))
  };

  const editTodo = (id, text) => {
    setTodos(todos.map(todo => {
      return todo.id === id ? { ...todo, text } : todo;
    }))
  };

  return (
    <div style={{ minHeight: '100vh', padding: 20 }}>
      <Row type="flex" justify="center">
        <Col xs={24} md={18}>
          <form onSubmit={e => {
            console.log('asda');
            e.preventDefault()
            if (!textInput.trim()) {
              return;
            }
            setTodos([{ id: nextTodo++, text: textInput, completed: false, deleted: false }, ...todos]);
            setTextInput('');
          }}>
            <Row type="flex" justify="start" gutter={8}>
              <Col><Input value={textInput} onChange={e => setTextInput(e.target.value)}/></Col>
              <Col><Button htmlType="submit">Add Todo</Button></Col>
            </Row>
          </form>
          <Row type="flex" justify="start" align="middle" gutter={8} style={{ margin: '10px 0' }}>
            <Col>Filter:</Col>
            <Col>
              <Radio.Group onChange={e => setVisibility(e.target.value)} value={visibility}>
                <Radio.Button value={SHOW_ALL}>All</Radio.Button>
                <Radio.Button value={SHOW_COMPLETED}>Completed</Radio.Button>
                <Radio.Button value={SHOW_ACTIVE}>Active</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Progress strokeLinecap="square" percent={progressTodo()} />
          <List
            bordered
            dataSource={getVisibleTodos(todos, visibility)}
            renderItem={item => (
              <List.Item style={{ width: '100%' }}>
                <TodoItem
                  todo={item}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
