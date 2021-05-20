import CryoCoin from "./abi/CryoCoin.json";
import Web3 from 'web3';
let web3 = new Web3(Web3.givenProvider);
const contract = new web3.eth.Contract(CryoCoin.abi, "0x9fae9c0594b56b53cfb1a9b03b2747404840400e");

export function initialiseCryoCoin() {

    let symbol, name;

    //prendo il simbolo del mio Coin
    contract.methods.symbol().call().then(value => {
        symbol = value;
    })

    //prendo il nome del mio Coin
    contract.methods.name().call().then(value => {
        name = value;
    })

    //prendo il mio bilancio
    contract.methods.balanceOf(account[0]).call().then(value => {
        document.getElementById('getAccountsBalance').innerHTML = value + ' ' + name + ' (' + symbol + ')' || 'Not able to get balance';
    })

    /* TRANSFER */
    const transfer = document.getElementById('transferPanel');
    const transferButton = document.getElementById('transferButton')
    const panelTransfer = document.getElementsByClassName("transfer")[0];

    /* TRANSFER FROM */
    const transferFrom = document.getElementById('transferFromPanel');
    const transferFromButton = document.getElementById('transferFromButton')
    const panelTransferFrom = document.getElementsByClassName("transferFrom")[0];

    /* APPROVE */
    const approve = document.getElementById('approvePanel');
    const approveButton = document.getElementById('approveButton')
    const panelApprove = document.getElementsByClassName("approve")[0];

    /* ALLOWANCE */
    const allowance = document.getElementById('allowancePanel');
    const allowanceButton = document.getElementById('allowanceButton')
    const panelAllowance = document.getElementsByClassName("allowance")[0];

    //Facendo click sul button 'getAccounts' verrà mostrato a video l'indirizzo dell'account collegato
    window.addEventListener('load', async () => {
        panelTransfer.style.display = "none";
        panelTransferFrom.style.display = "none";
        panelApprove.style.display = "none";
        panelAllowance.style.display = "none";
    });

    transfer.onclick = () => {
        panelTransfer.style.display = "block";
        panelTransferFrom.style.display = "none";
        panelApprove.style.display = "none";
        panelAllowance.style.display = "none";
    };

    transferFrom.onclick = () => {
        panelTransfer.style.display = "none";
        panelTransferFrom.style.display = "block";
        panelApprove.style.display = "none";
        panelAllowance.style.display = "none";
    };

    approve.onclick = () => {
        panelTransfer.style.display = "none";
        panelTransferFrom.style.display = "none";
        panelApprove.style.display = "block";
        panelAllowance.style.display = "none";
    };

    allowance.onclick = () => {
        panelTransfer.style.display = "none";
        panelTransferFrom.style.display = "none";
        panelApprove.style.display = "none";
        panelAllowance.style.display = "block";
    };

    const updateBlance = async () => {

        // Will open the MetaMask UI
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        let symbol, name;

        //prendo il simbolo del mio Coin
        contract.methods.symbol().call().then(value => {
            symbol = value;
        })

        //prendo il nome del mio Coin
        contract.methods.name().call().then(value => {
            name = value;
        })

        //prendo il mio bilancio
        contract.methods.balanceOf(account[0]).call().then(value => {
            document.getElementById('getAccountsBalance').innerHTML = value + ' ' + name + ' (' + symbol + ')' || 'Not able to get balance';
        })
    };

    /* FUNCTION */
    transferButton.onclick = () => {
        let to = document.getElementById('transferReceiver').value;
        let amount = document.getElementById('transferAmount').value;

        transferButton.innerHTML = "processing...";
        try {
            contract.methods.transfer(to, amount).send({ from: window.ethereum.selectedAddress }).then(value => {
                if (value) {
                    alert("Transazione avvenuta con successo!");
                    updateBlance();
                } else {
                    alert("La transazione non è avvenuta!");
                }
            });
        } catch (error) {
            if (error.code === "INVALID_ARGUMENT")
                alert("Compila tutti i campi!");
        } finally {
            transferButton.innerHTML = "TRANSFER!";
        }
    };

    transferFromButton.onclick = () => {
        let from = document.getElementById('transferFromFrom').value;
        let to = document.getElementById('transferFromTo').value;
        let amount = document.getElementById('transferFromAmount').value;

        transferFromButton.innerHTML = "processing...";
        try {
            contract.methods.transferFrom(from, to, amount).send({ from: window.ethereum.selectedAddress }).then(value => {
                if (value) {
                    alert("Transazione avvenuta con successo!");
                    updateBlance();
                } else {
                    alert("La transazione non è avvenuta!");
                }
            });
        } catch (error) {
            if (error.code === "INVALID_ARGUMENT")
                alert("Compila tutti i campi!");
        } finally {
            transferButton.innerHTML = "TRANSFER NOW!";
        }
    };

    approveButton.onclick = () => {
        let spender = document.getElementById('approveSpender').value;
        let amount = document.getElementById('approveAmount').value;

        approveButton.innerHTML = "processing...";
        try {
            contract.methods.approve(spender, amount).send({ from: window.ethereum.selectedAddress }).then(value => {
                if (value) {
                    alert("Transazione avvenuta con successo!");
                    updateBlance();
                } else {
                    alert("La transazione non è avvenuta!");
                }
            });
        } catch (error) {
            if (error.code === "INVALID_ARGUMENT")
                alert("Compila tutti i campi!");
        } finally {
            approveButton.innerHTML = "APPROVE!";
        }
    };

    allowanceButton.onclick = () => {
        let owner = window.ethereum.selectedAddress;
        let spender = document.getElementById('allowanceSpender').value;

        allowanceButton.innerHTML = "processing...";
        try {
            contract.methods.allowance(owner, spender).call().then(value => {
                document.getElementById("allowanceSetOwner").innerHTML = owner;
                document.getElementById("allowanceSetSpender").innerHTML = spender;
                document.getElementById("allowanceSetAmount").innerHTML = value;
            });
        } catch (error) {
            if (error.code === "INVALID_ARGUMENT")
                alert("Compila tutti i campi!");
        } finally {
            allowanceButton.innerHTML = "SHOW!";
        }
    };
};