import ReactDOM from 'react-dom';
import { getInstanceOfContract, initialize, getNameOfToken } from './Web3Util';
import "./index.css"
import React from 'react';

function BubaCoin(props) {
    return (
        <div>
            <h1 className="title">{props.nome}</h1>
            <div className="center">
                    <button id="connectButton">Connect to MetaMask</button><br/><br/>
                    <button id="getAccounts">Show the address of your account:</button> 
                    <p>Address of this account:<label id="getAccountsResult"></label></p>
                <div>
                <button id="totalSupply">The total supply of your coin is:</button>
                <p><p id="showTotalSupply"></p></p>
                <h1>Do you want to send some of your Bubacoins to a friend?</h1>
                <form>
                    <label for="addressFriend">Insert the address of your friend:</label>
                    <input type="text" id="addressFriend" name="addressFriend"></input> <br></br>
                    <label for="tokensToTransfer">How many bubas do you want to transfer?</label>
                    <input type="number" id="tokensToTrasnfer" name="tokensToTransfer"></input>
                </form>
                <button id="sendTransaction">Send bubas!</button>
            </div>
        </div>
        <br/>
    </div>       
    );
};
    

ReactDOM.render(<BubaCoin nome="BUBA"/>, document.getElementById('root'));