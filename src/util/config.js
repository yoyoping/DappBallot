export default {
  httpProvider: process.env.NODE_ENV === 'production' ? 'https://rinkeby.infura.io/YKZGQG2QTBx0tiWoB2IF' : 'https://rinkeby.infura.io/YKZGQG2QTBx0tiWoB2IF',
  abi: [
    {
      "constant": false,
      "inputs": [
        {
          "name": "to",
          "type": "address"
        }
      ],
      "name": "delegate",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "voter",
          "type": "address"
        }
      ],
      "name": "giveRightToVote",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "proposalNames",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "proposal",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "chairperson",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "name": "name",
          "type": "bytes32"
        },
        {
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "name": "weight",
          "type": "uint256"
        },
        {
          "name": "voted",
          "type": "bool"
        },
        {
          "name": "delegate",
          "type": "address"
        },
        {
          "name": "vote",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "winnerName",
      "outputs": [
        {
          "name": "winnerName_",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "winningProposal",
      "outputs": [
        {
          "name": "winningProposal_",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  addr: "0xf941aab2ff7bdd4124665ba4659e1e78a9979fa1"
}
