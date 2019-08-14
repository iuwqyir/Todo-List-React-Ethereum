import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import TodoList from './TodoList';

class App extends Component {
  componentDidMount() {
    this.loadUserAddress();
  }

  async loadUserAddress() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    this.setLoading(false);
  }

  setLoading(loading) {
    this.setState({loading});
  }

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      loading: true
    };
    this.setLoading = this.setLoading.bind(this);
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
                : <TodoList setLoading={this.setLoading} account={this.state.account} /> }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
