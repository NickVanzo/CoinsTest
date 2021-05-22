import React from 'react';
import Contract from './Contract';
import { bubaContractAbi, bubaContractAddress } from './constants'


class Showbuba extends React.Component {
    state = {
        bubaContractInstance: new Contract(bubaContractAbi, bubaContractAddress),
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        var nameOfToken = document.getElementById('showNameOfBuba');
        var maxNumToken = document.getElementById('showMaxQnt');
        var tokensLeft = document.getElementById('coinsRemaining');
        var symbolToken = document.getElementById('symbolOfToken');
        nameOfToken.innerHTML = await this.state.bubaContractInstance.getNameOfToken();
        maxNumToken.innerHTML = await this.state.bubaContractInstance.getTotalSupply();
        tokensLeft.innerHTML = await this.state.bubaContractInstance.getBalanceOf('0xC029Cd44048711B6979fE936303ecbcDEb521F9d');
        symbolToken.innerHTML = await this.state.bubaContractInstance.getSymbolOfToken();
    }

    render() {
        return (
            <div>
                <p>Name of token: <label id="showNameOfBuba"></label></p>
                <p>Max number of tokens: <label id="showMaxQnt"></label></p>
                <p>How many coins are in circulation: <label id="coinsRemaining"></label></p>
                <p>Symbol of the coin: <label id="symbolOfToken"></label></p>
            </div>
        )
    }
}


export default Showbuba;