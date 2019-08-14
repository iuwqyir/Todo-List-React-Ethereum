import React, { Component } from 'react';
import TodoItem from './TodoItem';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';

class TodoList extends Component {
  componentDidMount() {
    this.loadContractData();
  }

  constructor(props) {
    super(props);
    this.state = {
      completedItems: [],
      uncompletedItems: [],
      todoItemCount: 0
    };
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
  }

  async loadContractData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({ todoList });
    const todoItemCount = await todoList.methods.todoItemCount().call();
    const newItemIndex = await todoList.methods.newItemIndex().call();
    this.setState({ todoItemCount });

    let completedItems = [];
    let uncompletedItems = [];
    for (var i = 0; i < newItemIndex; i++) {
      const todoItem = await todoList.methods.todoItems(i).call();
      if (todoItem.title.length > 0 && todoItem.content.length > 0) {
        const element = <TodoItem key={todoItem.id} id={todoItem.id} todoItem={todoItem} toggleCompleted={this.toggleCompleted} deleteTodoItem={this.deleteTodoItem} />;
        if (todoItem.isCompleted) {
          completedItems.push(
          <TodoItem
            key={todoItem.id} 
            id={todoItem.id}
            todoItem={todoItem}
            toggleCompleted={this.toggleCompleted}
            deleteTodoItem={this.deleteTodoItem} />);
        } else {
          uncompletedItems.push(
            <TodoItem
            key={todoItem.id} 
            id={todoItem.id}
            todoItem={todoItem}
            toggleCompleted={this.toggleCompleted}
            deleteTodoItem={this.deleteTodoItem} />);
        }
      }
    }
    console.log(uncompletedItems);
    this.setState({uncompletedItems});
    this.setState({completedItems});
    this.props.setLoading(false);
  }

  createTodoItem(title, content) {
    this.props.setLoading(true);
    this.state.todoList.methods.createTodoItem(title, content).send({ from: this.props.account })
    .once('receipt', (receipt) => {
      this.props.setLoading(false);
    });
  }

  toggleCompleted(id) {
    this.props.setLoading(true);
    this.state.todoList.methods.toggleCompleted(id).send({ from: this.props.account })
    .once('receipt', (receipt) => {
      this.props.setLoading(false);
    });
  }

  deleteTodoItem(id) {
    this.props.setLoading(true);
    this.state.todoList.methods.deleteTodoItem(id).send({ from: this.props.account })
    .once('receipt', (receipt) => {
      this.props.setLoading(false);
    });
  }

  render(){
    return (
      <div id="content">
        <form onSubmit={(event) => {
          event.preventDefault();
          this.createTodoItem(this.todoItemTitle.value, this.todoItemContent.value);
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
