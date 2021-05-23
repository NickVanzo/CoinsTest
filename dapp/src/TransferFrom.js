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

    

    async transferFromButtonBuba() {
        const value = document.getElementById('amount').value;
        const fromAddress = document.getElementById('fromAddress').value;
        const toAddress = document.getElementById('toAddress').value;
        await this.state.bubaContractInstance.transferFrom(fromAddress, toAddress, value).then(() => {
            this.addRowTable(this.state.bubaContractInstance.getHash(), fromAddress, toAddress, value);
        })
    };
    async transferFromButtonCryo() {
        const value = document.getElementById('amount').value;
        const fromAddress = document.getElementById('fromAddress').value;
        const toAddress = document.getElementById('toAddress').value;
        await this.state.cryoContractInstance.transferFrom(fromAddress, toAddress, value);
        this.addRowTable(this.state.cryoContractInstance.getHash(), fromAddress, toAddress, value);
    }
    async transferFromButtonSimp() {
        const value = document.getElementById('amount').value;
        const fromAddress = document.getElementById('fromAddress').value;
        const toAddress = document.getElementById('toAddress').value;
        await this.state.simpContractInstance.transferFrom(fromAddress, toAddress, value);
        this.addRowTable(this.state.simpContractInstance.getHash(), fromAddress, toAddress, value);
    }

    addRowTable(hash, from, to, value) {
        const myTable = document.getElementById('tableBody');
        var row = myTable.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = hash;
        cell2.innerHTML = from;
        cell3.innerHTML = to;
        cell4.innerHTML = value;
    }



    render() {
        return (
            <div>
                <p><input id="fromAddress" className="w3-input w3-padding-16 w3-border" type="text" placeholder="fromAddress" required name="fromAddress" /></p>
                <p><input id="toAddress" className="w3-input w3-padding-16 w3-border" type="text" placeholder="toAddress" required name="toAddress" /></p>
                <p><input id="amount" className="w3-input w3-padding-16 w3-border" type="number" placeholder="Number of token" required name="amountToken" /></p>
                <p><button style={{ position: 'relative', left: '40%' }} id="buttonTransferFrom" className="w3-button w3-black" type="submit" onClick={this.transferFromButtonBuba}>TRANSFER  BUBA</button></p>
                <p><button style={{ position: 'relative', left: '40%' }} id="buttonTransferFrom" className="w3-button w3-black" type="submit" onClick={this.transferFromButtonCryo}>TRANSFER  CRYO</button></p>
                <p><button style={{ position: 'relative', left: '40%' }} id="buttonTransferFrom" className="w3-button w3-black" type="submit" onClick={this.transferFromButtonSimp}>TRANSFER  SIMP</button></p>
                <table>
                    <thead>
                        <tr>
                            <th>Hash</th>
                            <th>Sender</th>
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

export default TransferFrom;
