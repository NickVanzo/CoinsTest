import React from 'react';
import { bubaContractAbi, bubaContractAddress, cryoContractAddress, cryoContractAbi, simpContractAddress, simpContractAbi } from './constants';
import Contract from './Contract'
import 'firebase/firestore'
import { dbReference } from './Firestore'
import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore'
import Web3 from 'web3'

class FormTransfer extends React.Component {

    constructor(props) {
        super(props);
        this.transferButtonBuba = this.transferButtonBuba.bind(this);
        this.transferButtonCryo = this.transferButtonCryo.bind(this);
        this.transferButtonSimp = this.transferButtonSimp.bind(this);
        this.addRowTable = this.addRowTable.bind(this);
        this.state = {
            bubaContractInstance: new Contract(bubaContractAbi, bubaContractAddress),
            cryoContractInstance: new Contract(cryoContractAbi, cryoContractAddress),
            impContractInstance: new Contract(simpContractAbi, simpContractAddress),
        }
    }

    async componentDidMount() {
        const q = query(collection(dbReference, "transfers"),
            where("value", ">", "0")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            this.addRowTable(doc.data().from, doc.data().to, doc.data().value);
        })
    }

    async transferButtonBuba() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        const fromAddress = await window.ethereum.request({method: 'eth_accounts'});
        await this.state.bubaContractInstance.transfer(address, value).then(async () => {
            this.addRowTable(fromAddress[0], address, value);
            /**
            * Add the data into the database
            */
            await setDoc(doc(dbReference, "transfers", this.state.bubaContractInstance.getHash()), {
                from: fromAddress[0],
                to: address,
                value: value
            })
        })
    }

    async transferButtonCryo() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        const fromAddress = await Web3.ethereum.request({method: 'eth_accounts'});
        await this.state.cryoContractInstance.transfer(address, value).then(async () => {
            this.addRowTable(fromAddress[0], address, value);
            /**
            * Add the data into the database
            */
            await setDoc(doc(dbReference, "transfers", this.state.cryoContractInstance.getHash()), {
                from: fromAddress[0],
                to: address,
                value: value
            })
        })
    }

    async transferButtonSimp() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        const fromAddress = await Web3.ethereum.request({method: 'eth_accounts'});
        await this.state.simpContractInstance.transfer(address, value).then(async () => {
            this.addRowTable(fromAddress[0], address, value);
            /**
            * Add the data into the database
            */
            await setDoc(doc(dbReference, "transfers", this.state.simpContractInstance.getHash()), {
                from: fromAddress[0],
                to: address,
                value: value
            })
        })
    }

    addRowTable(from, to, value) {
        const myTable = document.getElementById('tableBody');
        var row = myTable.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = from;
        cell2.innerHTML = to;
        cell3.innerHTML = value;
    }

    render() {
        return (
            <div>
                <p><input id="address" className="w3-input w3-padding-16 w3-border" type="text" placeholder="Address Spender" required name="addressSpender" /></p>
                <p><input id="amount" className="w3-input w3-padding-16 w3-border" type="number" placeholder="Number of token" required name="amountToken" /></p>
                <p><button id="buttonTransfer" className="w3-button w3-black" type="submit" onClick={this.transferButtonBuba}>TRANSFER BUBA</button></p>
                <p><button id="buttonTransfer" className="w3-button w3-black" type="submit" onClick={this.transferButtonCryo}>TRANSFER CRYO</button></p>
                <p><button id="buttonTransfer" className="w3-button w3-black" type="submit" onClick={this.transferButtonSimp}>TRANSFER SIMP</button></p>
                <div style={{ position: 'fixed', top: '50%', left: '20%' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default FormTransfer;