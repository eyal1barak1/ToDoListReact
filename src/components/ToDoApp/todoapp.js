import React from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import TodoList from '../ToDoList/todolist'
import './todoapp.css';


function TodoApp() {

  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  const [allitems, setAllItems] = useState([]);


  function handleTextChange(event) {
    setText(event.target.value);
  }
  function handleAddItem(event) {
    event.preventDefault();
    // document.getElementById("add-btn").click();
    var newItem = {
      id: Date.now(),
      text: text,
      done: false
    };

    setItems(items.concat(newItem));
    setAllItems(allitems.concat(newItem));
    setText("");

  }
  function markItemCompleted(itemId) {
    var updatedItems = items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;

      return item;
    });

    // State Updates are Merged
    setItems([].concat(updatedItems));

  }
  function handleDeleteItem(itemId) {
    var updatedItems = allitems.filter(item => {
      return item.id !== itemId;
    });

    setAllItems([].concat(updatedItems));
    setItems([].concat(updatedItems));

  }

  function filterAll() {
    setItems([].concat(allitems));
  }

  function filterActive() {
    var updatedItems = allitems.filter(item => {
      return item.done === false;
    });

    setItems([].concat(updatedItems));
  }
  function filterCompleted() {
    var updatedItems = allitems.filter(item => {
      return item.done === true;
    });

    setItems([].concat(updatedItems));
  }

  return (
    <div>
      <h3 className="apptitle">Todos</h3>
      <form className="row">
        <div className="col-md-3">
          <button className="add-btn btn btn-primary" style={{ visibility: "hidden" }} onClick={handleAddItem}></button>
        </div>
        <div className="col-md-3">
          <input type="text" className="form-control" onChange={handleTextChange} value={text} />
        </div>
      </form>
      <div className="row">
        <div className="col-md-3">
          <TodoList items={items} onItemCompleted={markItemCompleted} onDeleteItem={handleDeleteItem} />
        </div>
      </div>
      <Row className="filter-row">
        <Col>
          <p>{(items.length) + " items left"}</p>
        </Col>
        <Col className="filter-col-btn">
          <button className="all-btn btn btn-primary" onClick={filterAll}>All</button>
          <button className="active-btn btn btn-primary" onClick={filterActive}>Active</button>
          <button className="completed-btn btn btn-primary" onClick={filterCompleted}>Completed</button>
        </Col>
      </Row>

    </div>
  )
}

export default TodoApp;