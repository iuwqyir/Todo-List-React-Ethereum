import React, { Component } from 'react';

class TodoItem extends Component {
  render(){
    const todoItem = this.props.todoItem;
    return (
      <div className="todoTemplate checkbox" key={this.props.id}>
        <label>
          <input 
            type="checkbox" 
            defaultChecked={todoItem.isCompleted}
            onClick={(event) => 
              this.props.toggleCompleted(todoItem.id)}/>
          <span className="todo-title">{todoItem.title}</span>
          -
          <span className="todo-content">{todoItem.content}</span>
          <button 
            type="button" 
            onClick={(event) => 
              this.props.deleteTodoItem(todoItem.id)}
            className="btn btn-sm btn-danger .delete-btn">
            Delete
          </button>
        </label>
      </div>
    );
  }
}

export default TodoItem;
