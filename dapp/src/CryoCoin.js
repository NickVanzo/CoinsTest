// import {cryoContract} from './constants';


// /**
//   * Returns the name of the token
//   */
//  export async function getNameOfTokenBuba() {
//     await cryoContract.methods.name().call().then(value => {
//       return value;
//       })
//     } 
  
//     /**
//        * Returns the symbol of the token
//        */
//     export async function getSymbolOfTokenBuba() {
//       await cryoContract.methods.symbol().call().then(value => {
//         return value;
//       })
//     }
  
//     /**
//        * Call the balanceOf function
//        */
//     export async function getBalanceOfBuba(address) {
//       await cryoContract.methods.balanceOf(address).call().then(value => {
//         return value;
//       })
//     }
  
//     /**
//        * Call the transferFrom function
//        */
//     export  async function transferFromBuba(fromAddress, toAddress, valueTransfered) {
//       await cryoContract.methods.transferFrom(fromAddress, toAddress, valueTransfered).send({
//         from : fromAddress
//       })
//     }
  
//     /**
//      * Call the approve function
//      */
//     export async function approveBuba(spender, value) {
//       const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//       await cryoContract.methods.approve(spender, value).send({
//         from : accounts[0],
//       })
//     }
  
//     /**
//        * Call the allowance function
//        */
//      export async function allowanceBuba(owner, spender) {
//       await cryoContract.methods.allowance(owner, spender).send({
//         from : owner
//       }); 
//     }
  
//     /**
//      * Call the totalSupply function of the contract
//      */
//     export async function getTotalSupplyBuba() {
//       await cryoContract.methods.totalSupply().call().then(value => {
//         return value;
//        })
//     }
  
//     /**
//        * Call the transfer function of the contract
//        */
//      async function transferBuba(to, value) {
//       const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//       await cryoContract.methods.transfer(to, value).send({ 
//         from : accounts[0],
//       }).then(value => {
//        cryoContract.methods.balanceOf(accounts[0]).call().then(value => {
//           window.alert("You now own: " + value + " coins");
//         });
//       });
//      }
  