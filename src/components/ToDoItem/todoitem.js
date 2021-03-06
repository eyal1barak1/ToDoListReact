import React from 'react';
import { useEffect } from 'react';
import './todoitem.css';

function ToDoItem(props) {

    const { id, onItemCompleted, onDeleteItem, completed, text } = props;
    var itemClass = "form-check todoitem " + (completed ? "done" : "undone");
    var added_item;
    function markCompleted(event) {
        onItemCompleted(id);
    }
    function deleteItem(event) {
        onDeleteItem(id);
    }

    useEffect(() => {
        if (added_item) {
            // 1. Add highlight class.
            added_item.classList.add("highlight");

            // 2. Set timeout.
            setTimeout((listItem) => {
                // 3. Remove highlight class.
                listItem.classList.remove("highlight");
            }, 500, added_item);
        }
    }, []);


    return (
        <li className={itemClass} ref={li => added_item = li}>
            <label className="form-check-label">
                <input type="checkbox" className="form-check-input" onChange={markCompleted} checked={completed} /> {text}
            </label>
            <button type="button" className="btn btn-danger btn-sm hover-button" onClick={deleteItem}>x</button>
        </li>
    )
}

export default ToDoItem;