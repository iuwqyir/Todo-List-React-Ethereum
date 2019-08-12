import React, { Component } from 'react';

class TodoList extends Component {
  render(){
    return (
      <div id="content">
        <form onSubmit={(event) => {
          event.preventDefault();
          this.props.createTodoItem(this.todoItemTitle.value, this.todoItemContent.value);
        }}>
          <div className="form-group">
            <input id="newTodoItemTitle" ref={(input)=> this.todoItemTitle = input} type="text" className="form-control" placeholder="Add a todo..." required/>
          </div>
          <div className="form-group">
            <input id="newTodoItemContent" ref={(input)=> this.todoItemContent = input} type="text" className="form-control" placeholder="Give a little description..." required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <ul id="todoList" className="list-unstyled">
          { this.props.todoItems.map((todoItem, key) => {
            return(
              <div className="todoTemplate checkbox" key={key}>
                <label>
                  <input type="checkbox" />
                  <span className="todo-title">{todoItem.title}</span>
                  -
                  <span className="todo-content">{todoItem.content}</span>
                  <button type="button" className="btn btn-sm btn-danger .delete-btn">Delete</button>
                </label>
              </div>
            )
          })}
        </ul>
        <ul id="completedTodoList" className="list-unstyled">
        </ul>
      </div>
    );
  }
}

export default TodoList;
