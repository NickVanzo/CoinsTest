import React from 'react';
import { bubaContractAbi, bubaContractAddress, cryoContractAddress, cryoContractAbi, simpContractAddress, simpContractAbi } from './constants';
import Contract from './Contract'
import 'firebase/firestore'
import { dbReference } from './Firestore'
import { doc, setDoc, query, collection, where, getDocs } from 'firebase/firestore'

class FormAllowance extends React.Component {


    constructor(props) {
        super(props);
        this.allowanceButtonBuba = this.allowanceButtonBuba.bind(this);
        this.allowanceButtonCryo = this.allowanceButtonCryo.bind(this);
        this.allowanceButtonSimp = this.allowanceButtonSimp.bind(this);
        this.showValue = this.showValue.bind(this);
        this.addRowTable = this.addRowTable.bind(this);
        this.state = {
            bubaContractInstance: new Contract(bubaContractAbi, bubaContractAddress),
            cryoContractInstance: new Contract(cryoContractAbi, cryoContractAddress),
            simpContractInstance: new Contract(simpContractAbi, simpContractAddress),
        }
    }

    /**
     * Fetch data from db by query
     */
    async componentDidMount() {
        const q = query(collection(dbReference, "allowance"),
            where("value", ">=", "0")
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            this.addRowTable(doc.data().owner, doc.data().spender, doc.data().value);
        })
    }

    async allowanceButtonBuba() {
        const owner = document.getElementById('addressOwner').value;
        const spender = document.getElementById('addressSpender').value;
        const nameOfToken = await this.state.bubaContractInstance.getNameOfToken();
        const value = await this.state.bubaContractInstance.allowance(owner, spender).then(async (value) => {

            await setDoc(doc(dbReference, "allowance"), {
                owner: owner,
                spender: spender,
                value: value
            });

            return value;
        });
        this.showValue(owner, spender, value, nameOfToken);
    }

    async allowanceButtonCryo() {
        const owner = document.getElementById('addressOwner').value;
        const spender = document.getElementById('addressSpender').value;
        const nameOfToken = await this.state.cryoContractInstance.getNameOfToken();
        const value = await this.state.cryoContractInstance.allowance(owner, spender).then(async (value) => {

            await setDoc(doc(dbReference, "allowance"), {
                owner: owner,
                spender: spender,
                value: value
            });

            return value;
        });
        this.showValue(owner, spender, value, nameOfToken);
    }

    async allowanceButtonSimp() {
        const owner = document.getElementById('addressOwner').value;
        const spender = document.getElementById('addressSpender').value;
        const nameOfToken = await this.state.simpContractInstance.getNameOfToken();
        const value = await this.state.simpContractInstance.allowance(owner, spender).then(async (value) => {

            await setDoc(doc(dbReference, "allowance", ID), {
                owner: owner,
                spender: spender,
                value: value
            });

            return value;
        });
        this.showValue(owner, spender, value, nameOfToken);
    }

    showValue(owner, spender, value, tokenName) {
        const res = document.getElementById('res');
        if (value !== undefined) {
            res.innerHTML = value + " " + tokenName;
            //add the row with all the values
            this.addRowTable(owner, spender, value);
        } else {
            res.innerHTML = " ";
            alert("Compilare i campi correttamente!");
        }
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
                <p><input id="addressOwner" className="w3-input w3-padding-16 w3-border" type="text" placeholder="Address Owner" required /></p>
                <p><input id="addressSpender" className="w3-input w3-padding-16 w3-border" type="text" placeholder="Address Spender" required /></p>
                <h2 id="res"></h2>
                <p><button style={{ position: 'relative', left: '40%' }} id="buttonAllowanceBuba" className="w3-button w3-black" type="submit" onClick={this.allowanceButtonBuba}>SHOW BUBA</button></p>
                <p><button style={{ position: 'relative', left: '40%' }} id="buttonAllowanceCryo" className="w3-button w3-black" type="submit" onClick={this.allowanceButtonCryo}>SHOW CRYO</button></p>
                <p><button style={{ position: 'relative', left: '40%' }} id="buttonAllowanceSimp" className="w3-button w3-black" type="submit" onClick={this.allowanceButtonSimp}>SHOW SIMP</button></p>
                <div style={{ overflowY: 'auto', position: 'fixed', top: '35%', left: '10%' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Owner</th>
                                <th>Spender</th>
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

export default FormAllowance;