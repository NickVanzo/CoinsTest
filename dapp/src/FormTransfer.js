import React from 'react';
import { bubaContractAbi, bubaContractAddress, cryoContractAddress, cryoContractAbi, simpContractAddress, simpContractAbi } from './constants';
import Contract from './Contract'

class FormTransfer extends React.Component {
    state = {
        bubaContractInstance : new Contract(bubaContractAbi, bubaContractAddress),
        cryoContractInstance : new Contract(cryoContractAbi, cryoContractAddress),
        impContractInstance : new Contract(simpContractAbi, simpContractAddress)
    }

    constructor(props) {
        super(props);
        this.transferButtonBuba = this.transferButtonBuba.bind(this);
        this.transferButtonCryo = this.transferButtonCryo.bind(this);
        this.transferButtonSimp = this.transferButtonSimp.bind(this);
    }

    async transferButtonBuba() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        await this.state.bubaContractInstance.transfer(address, value);
    }

    async transferButtonCryo() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        await this.state.cryoContractInstance.transfer(address, value);
    }

    async transferButtonSimp() {
        const value = document.getElementById('amount').value;
        const address = document.getElementById('address').value;
        await this.state.simpContractInstance.transfer(address, value);
    }

    render() {
        return (
            <div>
                <p><input id="address"className="w3-input w3-padding-16 w3-border" type="text" placeholder="Address Spender" required name="addressSpender" /></p>
                <p><input id="amount"className="w3-input w3-padding-16 w3-border" type="number" placeholder="Number of token" required name="amountToken" /></p>
                <p><button id="buttonTransfer" className="w3-button w3-black" type="submit" onClick={this.transferButtonBuba}>TRANSFER BUBA</button></p>
                <p><button id="buttonTransfer" className="w3-button w3-black" type="submit" onClick={this.transferButtonCryo}>TRANSFER CRYO</button></p>
                <p><button id="buttonTransfer" className="w3-button w3-black" type="submit" onClick={this.transferButtonSimp}>TRANSFER SIMP</button></p>
            </div>
        )
    }
}

export default FormTransfer;