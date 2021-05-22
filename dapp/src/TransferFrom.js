import React from 'react';
import { bubaContractAbi, bubaContractAddress, cryoContractAddress, cryoContractAbi, simpContractAddress, simpContractAbi } from './constants';
import Contract from './Contract'



class TransferFrom extends React.Component {
   
    constructor(props) {
        super(props);
        this.transferFromButtonBuba = this.transferFromButtonBuba.bind(this);
        this.transferFromButtonCryo = this.transferFromButtonCryo.bind(this);
        this.transferFromButtonSimp = this.transferFromButtonSimp.bind(this);
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
            window.alert("Hash: " + this.state.bubaContractInstance.getHash() + "\nFrom: " + this.state.bubaContractInstance.getSender() + "\nTo: " + this.state.bubaContractInstance.getReceiver() + "\nValue: " + this.state.bubaContractInstance.getValue())
        })
    };
    async transferFromButtonCryo() {
        const value = document.getElementById('amount').value;
        const fromAddress = document.getElementById('fromAddress').value;
        const toAddress = document.getElementById('toAddress').value;
        await this.state.cryoContractInstance.transferFrom(fromAddress, toAddress, value);
    }
    async transferFromButtonSimp() {
        const value = document.getElementById('amount').value;
        const fromAddress = document.getElementById('fromAddress').value;
        const toAddress = document.getElementById('toAddress').value;
        await this.state.simpContractInstance.transferFrom(fromAddress, toAddress, value);
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
            </div>
        )
    }
}

export default TransferFrom;
