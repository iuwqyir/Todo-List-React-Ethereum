import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  componentDidMount() {
    this.createElements();
  }

  constructor(props) {
    super(props);
    this.state = {
      completedItems: [],
      uncompletedItems: []
    };
  }

  createElements() {
    let completedItems = [];
    let uncompletedItems = [];
    this.props.todoItems.map((todoItem, key) => {
        if (todoItem.isCompleted) {
          completedItems.push(
            <TodoItem
              key={key} 
              id={key}
              todoItem={todoItem}
              toggleCompleted={this.props.toggleCompleted}
              deleteTodoItem={this.props.deleteTodoItem} />);
        } else {
          uncompletedItems.push(
            <TodoItem
              key={key} 
              id={key}
              todoItem={todoItem}
              toggleCompleted={this.props.toggleCompleted}
              deleteTodoItem={this.props.deleteTodoItem} />);
        }
    });

    this.setState({uncompletedItems});
    this.setState({completedItems});
  }

  render(){
    return (
      <div id="content">
        <form onSubmit={(event) => {
          event.preventDefault();
          this.props.createTodoItem(this.todoItemTitle.value, this.todoItemContent.value);
        }}>
          <div className="form-group">
            <input 
              id="newTodoItemTitle" 
              ref={(input)=> this.todoItemTitle = input} 
              type="text" 
              className="form-control" 
              placeholder="Add a todo..." required/>
          </div>
          <div className="form-group">
            <input 
              id="newTodoItemContent" 
              ref={(input)=> this.todoItemContent = input} 
              type="text" 
              className="form-control" 
              placeholder="Give a little description..." required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <ul id="todoList" className="list-unstyled">
          {this.state.uncompletedItems}
        </ul>
        <ul id="completedTodoList" className="list-unstyled">
          {this.state.completedItems}
        </ul>
      </div>
    );
  }
}

export default TodoList;
