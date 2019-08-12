import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';
import TodoList from './TodoList';

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({ todoList });
    const todoItemCount = await todoList.methods.todoItemCount().call();
    const newItemIndex = await todoList.methods.newItemIndex().call();
    this.setState({ todoItemCount });
    for (var i = 0; i < newItemIndex; i++) {
      const todoItem = await todoList.methods.todoItems(i).call();
      if (todoItem.title.length > 0 && todoItem.content.length > 0) {
        this.setState({
          todoItems: [todoItem, ...this.state.todoItems]
        });
      }
    }
    this.setState({ loading: false });
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      todoItemCount: 0,
      todoItems: [],
      loading: true
    };
    this.createTodoItem = this.createTodoItem.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
  }

  createTodoItem(title, content) {
    this.setState({ loading: true });
    this.state.todoList.methods.createTodoItem(title, content).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false });
    });
  }

  toggleCompleted(id) {
    this.setState({ loading: true });
    this.state.todoList.methods.toggleCompleted(id).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false });
    });
  }

  deleteTodoItem(id) {
    console.log(id);
    this.setState({ loading: true });
    this.state.todoList.methods.deleteTodoItem(id).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false });
    });
  }

  render(){
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Iuwqyir's Todo List</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex justify-content-center">
              { this.state.loading 
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div> 
                : <TodoList 
                  todoItems={this.state.todoItems} 
                  createTodoItem={this.createTodoItem}
                  toggleCompleted={this.toggleCompleted} 
                  deleteTodoItem={this.deleteTodoItem} /> }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
