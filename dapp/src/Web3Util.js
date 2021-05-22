/**
 * Copyright © MIT
 * To install metamask/onboarding go to the project directory and run "npx install metamask/onboarding" if 
 * you are using npm installer.
 * Security issue: as far as I know there's a newer method to connect with your MetaMask wallet 
 * but I could't figure out how to make it work, for more info go to this link:https://docs.metamask.io/guide/provider-migration.html#replacing-window-web3
 */


import MetaMaskOnboarding from "@metamask/onboarding";
// import { initialiseCryoCoin } from "./CryoCoin.js"
const forwarderOrigin = 'http://localhost:3000';

const initialize = async () => {
    const onboardButton = document.getElementById('connectButton');

    /**
     * @returns Check the ethereum binding on the window object to see if it's installed
     */
    function isMetaMaskInstalled() {
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    }

    //We create a new MetaMask onboarding object to use in our app
    const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

    /**
     * Start the onboarding process.
     * The onboard process let a new user install MetaMask
     */
    function onClickInstall() {
        onboardButton.innerText = 'Onboarding in progress';
        onboardButton.disabled = true;
        onboarding.startOnboarding();
    }


    /**
     * Will open the MetaMask UI
     * You should disable this button while the request is pending!
     */
    async function onClickConnect() {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            onboardButton.style.display = "none";
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Check if MetaMask is installed. 
     * If it is not: call the install funcion
     * If it is: call the connect function
     * Disable the button, there's no need for it anymore
     */
    function MetaMaskClientCheck() {
        if (!isMetaMaskInstalled()) {
            onboardButton.innerText = 'Click here to install MetaMask!';
            onboardButton.onclick = onClickInstall;
            onboardButton.disabled = false;
        } else {
            onboardButton.innerText = 'Connect';
            onboardButton.onclick = onClickConnect;
            onboardButton.disabled = false;
        }
    }

    MetaMaskClientCheck();
};

window.addEventListener('DOMContentLoaded', initialize);