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
            impContractInstance: new Contract(simpContractAbi, simpContractAddress),
        }
    }

    componentDidMount() {
        var i = 0;
        this.state.bubaContractInstance.getEvents().then(value => {
            i = 0;
            while(i < value.length) {
                this.addRowTable(value[i].returnValues[0], value[i].returnValues[1], value[i].returnValues[2]);
                i++;
            }
        })
    }

    async transferButtonBuba() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        await this.state.bubaContractInstance.transfer(address, value);
        this.state.bubaContractInstance.getEvents().then(value => {
            this.addRowTable(value[value.length - 1].returnValues[0], value[value.length - 1].returnValues[1], value[value.length - 1].returnValues[2]);
        })
    }

    async transferButtonCryo() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        await this.state.cryoContractInstance.transfer(address, value);
        this.state.cryoContractInstance.getEvents()
        this.state.cryoContractInstance.getEvents().then(value => {
            this.addRowTable(value[value.length - 1].returnValues[0], value[value.length - 1].returnValues[1], value[value.length - 1].returnValues[2]);
        })
    }

    async transferButtonSimp() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        await this.state.simpContractInstance.transfer(address, value);
        this.state.impContractInstance.getEvents().then(value => {
            this.addRowTable(value[value.length - 1].returnValues[0], value[value.length - 1].returnValues[1], value[value.length - 1].returnValues[2]);
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
                <div style={{position: 'fixed', top: '50%', left: '20%'}}>
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