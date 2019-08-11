import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config';

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
    this.setState({ todoItemCount });
    for (var i = 0; i < todoItemCount; i++) {
      const todoItem = await todoList.methods.todoItems(i).call();
      this.setState({
        todoItems: [...this.state.todoItems, todoItem]
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      todoItemCount: 0,
      todoItems: []
    };
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
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
              <div id="content">
              <form>
                <div className="form-group">
                  <input id="newTodoItemTitle" type="text" className="form-control" placeholder="Add a todo..." required/>
                </div>
                <div className="form-group">
                  <input id="newTodoItemContent" type="text" className="form-control" placeholder="Give a little description..." required/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
                <ul id="todoList" className="list-unstyled">
                  { this.state.todoItems.map((todoItem, key) => {
                    return(
                      <div className="todoTemplate" className="checkbox" key={key}>
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
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
