import React from 'react';
import Contract from './Contract';
import {simpContractAddress, simpContractAbi } from './constants';

class Showsimp extends React.Component {
    state = {
        simpContractInstance: new Contract(simpContractAbi, simpContractAddress),
    }

    async componentDidMount() {
        var nameOfToken = document.getElementById('showNameOfSimp');
        var maxNumToken = document.getElementById('showMaxQntSimp');
        var tokensLeft = document.getElementById('coinsRemainingSimp');
        var symbolToken = document.getElementById('symbolOfTokenSimp');
        nameOfToken.innerHTML = await this.state.simpContractInstance.getNameOfToken();
        maxNumToken.innerHTML = await this.state.simpContractInstance.getTotalSupply();
        tokensLeft.innerHTML = await this.state.simpContractInstance.getBalanceOf("0x42dF90df29EBDC04E244beC4da8E3375AF4F5EF6");
        symbolToken.innerHTML = await this.state.simpContractInstance.getSymbolOfToken();
    }

    render() {
        return (
            <div>
                <p>Name of token: <label id="showNameOfSimp"></label></p>
                <p>Max number of tokens: <label id="showMaxQntSimp"></label></p>
                <p>How many coins are in circulation: <label id="coinsRemainingSimp"></label></p>
                <p>Symbol of the coin: <label id="symbolOfTokenSimp"></label></p>
            </div>
        )
    }
}

export default Showsimp;