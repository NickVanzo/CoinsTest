import React from 'react';
import { bubaContractAbi, bubaContractAddress, cryoContractAddress, cryoContractAbi, simpContractAddress, simpContractAbi } from './constants';
import Contract from './Contract'

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
            impContractInstance: new Contract(simpContractAbi, simpContractAddress)
        }
    }

    async transferButtonBuba() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        await this.state.bubaContractInstance.transfer(address, value);
        this.addRowTable(this.state.bubaContractInstance.getHash(), address, value);
    }

    async transferButtonCryo() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        await this.state.cryoContractInstance.transfer(address, value);
        this.addRowTable(this.state.cryoContractInstance.getHash(), address, value);
    }

    async transferButtonSimp() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        await this.state.simpContractInstance.transfer(address, value);
        this.addRowTable(this.state.simpContractInstance.getHash(), address, value);
    }

    addRowTable(hash, to, value) {
        const myTable = document.getElementById('tableBody');
        var row = myTable.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = hash;
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
                <table>
                    <thead>
                        <tr>
                            <th>Hash</th>
                            <th>Receiver</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FormTransfer;