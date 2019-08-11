export const TODO_LIST_ADDRESS = '0x6C202366d70e4d034CEafD4e020bf6625dF9FC86';
export const TODO_LIST_ABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "newItemIndex",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x1c1fb29b"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "todoItems",
      "outputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "content",
          "type": "string"
        },
        {
          "name": "isCompleted",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xc627e610"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "todoItemCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xe9945893"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "content",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "isCompleted",
          "type": "bool"
        }
      ],
      "name": "TodoItemCreated",
      "type": "event",
      "signature": "0x79253a2e1b2cf5ab9f8f6e3694ba99d86d26ce6ce34cb7d517bb32511d7bb610"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "completed",
          "type": "bool"
        }
      ],
      "name": "TodoItemToggled",
      "type": "event",
      "signature": "0x4a2e02c4dbeb7254557b977cbb7f5af66fc46150ee3cb2fefcc96ae4f27bdd62"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_title",
          "type": "string"
        },
        {
          "name": "_content",
          "type": "string"
        }
      ],
      "name": "createTodoItem",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xc8eca9a6"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "toggleCompleted",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x455f5024"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "deleteTodoItem",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x12f616a2"
    }
  ]