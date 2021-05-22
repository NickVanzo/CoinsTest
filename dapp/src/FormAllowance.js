import React from 'react';
import { bubaContractAbi, bubaContractAddress, cryoContractAddress, cryoContractAbi, simpContractAddress, simpContractAbi } from './constants';
import Contract from './Contract'

class FormAllowance extends React.Component {
    state = {
        bubaContractInstance: new Contract(bubaContractAbi, bubaContractAddress),
        cryoContractInstance: new Contract(cryoContractAbi, cryoContractAddress),
        simpContractInstance: new Contract(simpContractAbi, simpContractAddress)
    }

    constructor(props) {
        super(props);
        this.allowanceButtonBuba = this.allowanceButtonBuba.bind(this);
        this.allowanceButtonCryo = this.allowanceButtonCryo.bind(this);
        this.allowanceButtonSimp = this.allowanceButtonSimp.bind(this);
    }

    async allowanceButtonBuba() {
        const owner = document.getElementById('addressOwner').value;
        const spender = document.getElementById('addressSpender').value;
        const res = document.getElementById('res');
        const nameOfToken = await this.state.bubaContractInstance.getNameOfToken();
        res.innerHTML = "processing...";
        try {
            res.innerHTML = await this.state.bubaContractInstance.allowance(owner, spender);
            res.innerHTML += " " + nameOfToken;
        } catch (error) {
            switch (error.code) {
                case "INVALID_ARGUMENT":
                    alert("I CAMPI NON SONO COMPILATI CORRETTAMENTE");
                    break;
                default:
                    alert(error);
                    break;
            }
            res.innerHTML = "";
        }
    }

    async allowanceButtonCryo() {
        const owner = document.getElementById('addressOwner').value;
        const spender = document.getElementById('addressSpender').value;
        const res = document.getElementById('res');
        const nameOfToken = await this.state.cryoContractInstance.getNameOfToken();
        res.innerHTML = "processing...";
        try {
            res.innerHTML = await this.state.cryoContractInstance.allowance(owner, spender);
            res.innerHTML += " " + nameOfToken;
        } catch (error) {
            switch (error.code) {
                case "INVALID_ARGUMENT":
                    alert("I CAMPI NON SONO COMPILATI CORRETTAMENTE");
                    break;
                default:
                    alert(error);
                    break;
            }
            res.innerHTML = "";
        }
    }

    async allowanceButtonSimp() {
        const owner = document.getElementById('addressOwner').value;
        const spender = document.getElementById('addressSpender').value;
        const res = document.getElementById('res');
        const nameOfToken = await this.state.simpContractInstance.getNameOfToken();
        res.innerHTML = "processing...";
        try {
            res.innerHTML = await this.state.simpContractInstance.allowance(owner, spender);
            res.innerHTML += " " + nameOfToken;
        } catch (error) {
            switch (error.code) {
                case "INVALID_ARGUMENT":
                    alert("I CAMPI NON SONO COMPILATI CORRETTAMENTE");
                    break;
                default:
                    alert(error);
                    break;
            }
            res.innerHTML = "";
        }
    }

    render() {
        return (
            <div>
                <p><input id="addressOwner" className="w3-input w3-padding-16 w3-border" type="text" placeholder="Address Owner" required /></p>
                <p><input id="addressSpender" className="w3-input w3-padding-16 w3-border" type="text" placeholder="Address Spender" required /></p>
                <h2 id="res"></h2>
                <p><button id="buttonAllowanceBuba" className="w3-button w3-black" type="submit" onClick={this.allowanceButtonBuba}>SHOW BUBA</button></p>
                <p><button id="buttonAllowanceCryo" className="w3-button w3-black" type="submit" onClick={this.allowanceButtonCryo}>SHOW CRYO</button></p>
                <p><button id="buttonAllowanceSimp" className="w3-button w3-black" type="submit" onClick={this.allowanceButtonSimp}>SHOW SIMP</button></p>
            </div>
        )
    }

}

export default FormAllowance;