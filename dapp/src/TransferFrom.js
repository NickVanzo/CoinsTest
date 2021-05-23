import React from 'react';
import { bubaContractAbi, bubaContractAddress, cryoContractAddress, cryoContractAbi, simpContractAddress, simpContractAbi } from './constants';
import Contract from './Contract'

class TransferFrom extends React.Component {

    constructor(props) {
        super(props);
        this.transferFromButtonBuba = this.transferFromButtonBuba.bind(this);
        this.transferFromButtonCryo = this.transferFromButtonCryo.bind(this);
        this.transferFromButtonSimp = this.transferFromButtonSimp.bind(this);
        this.addRowTable = this.addRowTable.bind(this);
        this.state = {
            bubaContractInstance: new Contract(bubaContractAbi, bubaContractAddress),
            cryoContractInstance: new Contract(cryoContractAbi, cryoContractAddress),
            simpContractInstance: new Contract(simpContractAbi, simpContractAddress),
        }
    }

    componentDidMount() {
        /**
         * Load the last event emitted for each coin
         */
        var i = 0;
        this.state.bubaContractInstance.getEvents().then(value => {
            i = 0;
            while(i < value.length) {
                this.addRowTable(value[i].returnValues[0], value[i].returnValues[1], value[i].returnValues[2]);
                i++;
            }
        })
    }

    async transferFromButtonBuba() {
        const value = document.getElementById('amount').value;
        const fromAddress = document.getElementById('fromAddress').value;
        const toAddress = document.getElementById('toAddress').value;
        await this.state.bubaContractInstance.transferFrom(fromAddress, toAddress, value).then(() => {
            this.state.bubaContractInstance.getEvents().then(value => {
                this.addRowTable(value[value.length-1].returnValues[0], value[value.length-1].returnValues[1], value[value.length-1].returnValues[2]); 
            })
        })
        
    };
    async transferFromButtonCryo() {
        const value = document.getElementById('amount').value;
        const fromAddress = document.getElementById('fromAddress').value;
        const toAddress = document.getElementById('toAddress').value;
        await this.state.cryoContractInstance.transferFrom(fromAddress, toAddress, value);
        this.state.cryoContractInstance.getEvents().then(value => {
            this.addRowTable(value[value.length-1].returnValues[0], value[value.length-1].returnValues[1], value[value.length-1].returnValues[2]); 
        })
    }
    async transferFromButtonSimp() {
        const value = document.getElementById('amount').value;
        const fromAddress = document.getElementById('fromAddress').value;
        const toAddress = document.getElementById('toAddress').value;
        await this.state.simpContractInstance.transferFrom(fromAddress, toAddress, value);
        this.state.simpContractInstance.getEvents().then(value => {
            this.addRowTable(value[value.length-1].returnValues[0], value[value.length-1].returnValues[1], value[value.length-1].returnValues[2]); 
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
            <div >
                <p><input id="fromAddress" className="w3-input w3-padding-16 w3-border" type="text" placeholder="fromAddress" required name="fromAddress" /></p>
                <p><input id="toAddress" className="w3-input w3-padding-16 w3-border" type="text" placeholder="toAddress" required name="toAddress" /></p>
                <p><input id="amount" className="w3-input w3-padding-16 w3-border" type="number" placeholder="Number of token" required name="amountToken" /></p>
                <p><button style={{ position: 'relative', left: '40%' }} id="buttonTransferFrom" className="w3-button w3-black" type="submit" onClick={this.transferFromButtonBuba}>TRANSFER  BUBA</button></p>
                <p><button style={{ position: 'relative', left: '40%' }} id="buttonTransferFrom" className="w3-button w3-black" type="submit" onClick={this.transferFromButtonCryo}>TRANSFER  CRYO</button></p>
                <p><button style={{ position: 'relative', left: '40%' }} id="buttonTransferFrom" className="w3-button w3-black" type="submit" onClick={this.transferFromButtonSimp}>TRANSFER  SIMP</button></p>
                <div style={{overflowY: 'auto', position: 'fixed', top: '35%', left: '10%'}}>
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

export default TransferFrom;
