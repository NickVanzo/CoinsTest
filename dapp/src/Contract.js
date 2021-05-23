/**
 * Copyright © MIT
 */


import Web3 from 'web3';
var web3 = new Web3(window.ethereum);

export class Contract {
  constructor(abi, address) {
    this.state = {
      contract: new web3.eth.Contract(
        abi,
        address
      ),
      hash: 0,
      sender: null,
      receiver: null,
      value: 0
    }
  }

  /**
    * Returns the name of the token
    */
  async getNameOfToken() {
    try {
      return await this.state.contract.methods.name().call().then(value => {
        return value;
      })
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * Returns the symbol of the token
     */
  async getSymbolOfToken() {
    try {
      return await this.state.contract.methods.symbol().call().then(value => {
        return value;
      })
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * Call the balanceOf function
     */
  async getBalanceOf(address) {
    try {
      return await this.state.contract.methods.balanceOf(address).call().then(value => {
        return value;
      })
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * Call the transferFrom function
     */
  async transferFrom(fromAddress, toAddress, valueTransfered) {
    try {
      this.setReceiver(toAddress);
      this.setSender(fromAddress);
      this.setValue(valueTransfered);
      return await this.state.contract.methods.transfer(toAddress, valueTransfered).send({
        from: fromAddress
      }).on('transactionHash', (hash) => {
        this.setHash(hash);
      })
    } catch (errors) {
      console.log(errors);
    }
  }

  /**
   * Call the approve function
   */
  async approve(spender, value) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return await this.state.contract.methods.approve(spender, value).send({
        from: accounts[0],
      })
    } catch (errors) {
      console.log(errors);
    }
  }

  /**
     * Call the allowance function
     */
  async allowance(owner, spender) {
    try {
      return await this.state.contract.methods.allowance(owner, spender).call().then(value => {
        return value;
      });
    } catch (errors) {
      console.log(errors);
    }
  }

  /**
   * Call the totalSupply function of the contract
   */
  async getTotalSupply() {
    try {
      return await this.state.contract.methods.totalSupply().call().then(value => {
        return value;
      })
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * Call the transfer function of the contract
     */
  async transfer(to, value) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      await this.state.contract.methods.transfer(to, value).send({
        from: accounts[0],
      }).on('transactionHash', (hash) => {
        this.setHash(hash);
      });
    } catch (error) {
      console.log(error);
    }
  }

  getHash() {
    return this.state.hash;
  }

  getSender() {
    return this.state.sender;
  }

  getReceiver() {
    return this.state.receiver;
  }

  getValue() {
    return this.state.value;
  }

  setHash(newHash) {
    this.state.hash = newHash;
  }

  setSender(newSender) {
    this.state.sender = newSender;
  }

  setReceiver(newReceiver) {
    this.state.receiver = newReceiver;
  }

  setValue(newValue) {
    this.state.value = newValue;
  }
}

export default Contract;