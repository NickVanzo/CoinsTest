import Web3 from 'web3';

var web3 = new Web3(window.ethereum);

export class Contract {
  constructor(abi, address) {
    this.state = {
      contract : new web3.eth.Contract(
        abi,
        address
     )
    }
  
}

/**
  * Returns the name of the token
  */
  async getNameOfToken() {
  return await this.state.contract.methods.name().call().then(value => {
    return value;
    })
  } 

  // /**
  //    * Returns the symbol of the token
  //    */
  // async getSymbolOfToken() {
  //   await contract.methods.symbol().call().then(value => {
  //     return value;
  //   })
  // }

  // /**
  //    * Call the balanceOf function
  //    */
  // async getBalanceOf(address) {
  //   await contract.methods.balanceOf(address).call().then(value => {
  //     return value;
  //   })
  // }

  // /**
  //    * Call the transferFrom function
  //    */
  // async transferFrom(fromAddress, toAddress, valueTransfered) {
  //   await contract.methods.transferFrom(fromAddress, toAddress, valueTransfered).send({
  //     from : fromAddress
  //   })
  // }

  // /**
  //  * Call the approve function
  //  */
  // async approve(spender, value) {
  //   const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  //   await contract.methods.approve(spender, value).send({
  //     from : accounts[0],
  //   })
  // }

  // /**
  //    * Call the allowance function
  //    */
  //  async allowance(owner, spender) {
  //   await contract.methods.allowance(owner, spender).send({
  //     from : owner
  //   }); 
  // }

  // /**
  //  * Call the totalSupply function of the contract
  //  */
  // async getTotalSupply() {
  //   await contract.methods.totalSupply().call().then(value => {
  //     return value;
  //    })
  // }

  // /**
  //    * Call the transfer function of the contract
  //    */
  //  async transfer(to, value) {
  //   const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  //   await contract.methods.transfer(to, value).send({ 
  //     from : accounts[0],
  //   }).then(value => {
  //    contract.methods.balanceOf(accounts[0]).call().then(value => {
  //       window.alert("You now own: " + value + " coins");
  //     });
  //   });
  //  }
  }

  export default Contract;