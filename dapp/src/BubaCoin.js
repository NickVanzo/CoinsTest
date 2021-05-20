import MyERC20Token from "./abi/MyERC20Token.json";
import Web3 from "web3";

export async function initialiseBubaCoins() {

    const getTotalSupply = document.getElementById('totalSupply');
    const showTotalSupply = document.getElementById('showTotalSupply');
    const sendCoinsButton = document.getElementById('sendTransaction');
    const addressToTransferTo = document.getElementById('addressFriend');
    const quantityOfBubasToSend = document.getElementById('tokensToTrasnfer');
    
    const web3 = new Web3(window.ethereum);
        const networkId = web3.eth.net.getId();
        window.user = (await web3.eth.getAccounts())[0];
        const deployedNetwork = MyERC20Token.networks[networkId];
        const myContract  = new web3.eth.Contract(
          MyERC20Token.abi,
          "0x5E68826aBf90B23a7757657f3138f2a1AAF21174"
        );  
    
        /**
         * Call the totalSupply function of the contract
         */
    getTotalSupply.addEventListener('click', async () => {
      const totalSupply = await myContract.methods.totalSupply().call().then(value => {
      showTotalSupply.innerText = value;
     })
    });
    
      /**
       * Call the transfer function of the contract
       */
    sendCoinsButton.addEventListener('click', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      await myContract.methods.transfer(addressToTransferTo.value, quantityOfBubasToSend.value).send({ 
        from : accounts[0],
      }).then(value => {
       myContract.methods.balanceOf(accounts[0]).call().then(value => {
          window.alert("You now own: " + value + " coins");
        });
      });
    });
}
window.addEventListener('DOMContentLoaded', initialiseBubaCoins);