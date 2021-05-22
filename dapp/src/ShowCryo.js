import React from 'react';
import Contract from './Contract';
import { cryoContractAddress, cryoContractAbi } from './constants';

class Showcryo extends React.Component {
    state = {
        cryoContractInstance: new Contract(cryoContractAbi, cryoContractAddress),
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        var nameOfToken = document.getElementById('showNameOfCryo');
        var maxNumToken = document.getElementById('showMaxQntCryo');
        var tokensLeft = document.getElementById('coinsRemainingCryo');
        var symbolToken = document.getElementById('symbolOfTokenCryo');
        nameOfToken.innerHTML = await this.state.cryoContractInstance.getNameOfToken();
        maxNumToken.innerHTML = await this.state.cryoContractInstance.getTotalSupply();
        tokensLeft.innerHTML = await this.state.cryoContractInstance.getBalanceOf('0x449D0114120F29eAE304e573F9d39A5860aa7599');
        symbolToken.innerHTML = await this.state.cryoContractInstance.getSymbolOfToken();
    }

    render() {
        return (
            <div>
                <p>Name of token: <label id="showNameOfCryo"></label></p>
                <p>Max number of tokens: <label id="showMaxQntCryo"></label></p>
                <p>How many coins are in circulation: <label id="coinsRemainingCryo"></label></p>
                <p>Symbol of the coin: <label id="symbolOfTokenCryo"></label></p>
            </div>
        )
    }
}

export default Showcryo;