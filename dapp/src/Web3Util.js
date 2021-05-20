/**
 * Copyright © MIT
 * To install metamask/onboarding go to the project directory and run "npx install metamask/onboarding" if 
 * you are using npm installer.
 * Security issue: as far as I know there's a newer method to connect with your MetaMask wallet 
 * but I could't figure out how to make it work, for more info go to this link:https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3
 */


import MetaMaskOnboarding from "@metamask/onboarding";
import MyERC20Token from "./abi/MyERC20Token.json";
import Web3 from "web3"
const forwarderOrigin = 'http://localhost:3000';

const initialize = async () => {
    const onboardButton = document.getElementById('connectButton');
    const getAccountsButton = document.getElementById('getAccounts');
    const getAccountsResult = document.getElementById('getAccountsResult');
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
     * @returns Check the ethereum binding on the window object to see if it's installed
     */
    const isMetaMaskInstalled = () => {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };

    //We create a new MetaMask onboarding object to use in our app
    const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

    /**
     * Start the onboarding process.
     * The onboard process let a new user install MetaMask
     */
    const onClickInstall = () => {
        onboardButton.innerText = 'Onboarding in progress';
        onboardButton.disabled = true;
        onboarding.startOnboarding();
    };

    /**
     * Will open the MetaMask UI
     * You should disable this button while the request is pending!
     */
    const onClickConnect = async () => {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error(error);
        }
    };

    /**
     * Check if MetaMask is installed. 
     * If it is not: call the install funcion
     * If it is: call the connect function
     * Disable the button, there's no need for it anymore
     */
    const MetaMaskClientCheck = () => {
        if (!isMetaMaskInstalled()) {
            onboardButton.innerText = 'Click here to install MetaMask!';
            onboardButton.onclick = onClickInstall;
            onboardButton.disabled = false;
        } else {
            onboardButton.innerText = 'Connect';
            onboardButton.onclick = onClickConnect;
            onboardButton.disabled = false;
        }
      };

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
    })

    
  
    /**
     * Get the accounts of the wallet
     * We take the first address
     * eth_accounts returns a alist of addresses owned by us
     */
    getAccountsButton.addEventListener('click', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
    });

    MetaMaskClientCheck();
};

window.addEventListener('DOMContentLoaded', initialize);