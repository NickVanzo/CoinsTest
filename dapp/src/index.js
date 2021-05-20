import ReactDOM from 'react-dom';
import'./Web3Util';
import "./index.css"
import React from 'react';

function ShowCryo() {
    return (
        <div className="container">
      <nav>
        <h1 id="getAccountsResult" title="Address Account" >[Address Account]</h1>
        <h2 id="getAccountsBalance" title="Balance">[Balance]</h2>
      </nav>
      <div id="operations">
        <ul>
          <li id="transferPanel">Transfer</li>
          <li id="transferFromPanel">Transfer From</li>
          <li id="approvePanel">Approve</li>
          <li id="allowancePanel">Allowance</li>
        </ul>
      </div>

      {/* TRANSFER */}
      <div className="form transfer">
        <h2 style={{ textAlign: "center" }}>TRANSFER</h2>
        <div>
          <label>Receiver Address: </label><input type="text" id="transferReceiver" autocomplete='off'></input>
        </div>
        <div>
          <label>Amount to send: </label><input type="number" id="transferAmount" autocomplete='off'></input>
        </div>
        <button id="transferButton">TRANSFER!</button>
      </div>

      {/* TRANSFER FROM */}
      <div className="form transferFrom">
        <h2 style={{ textAlign: "center" }}>TRANSFER FROM</h2>
        <div>
          <label>From Address: </label><input type="text" id="transferFromFrom"></input>
        </div>
        <div>
          <label>To Address: </label><input type="text" id="transferFromTo"></input>
        </div>
        <div>
          <label>Amount to transfer: </label><input type="number" id="transferFromAmount"></input>
        </div>
        <button id="transferFromButton">TRANSFER NOW!</button>
      </div>

      {/* APPROVE */}
      <div className="form approve">
        <h2 style={{ textAlign: "center" }}>APPROVE</h2>
        <div>
          <label>Spender Address: </label><input type="text" id="approveSpender"></input>
        </div>
        <div>
          <label>Amount to approve: </label><input type="number" id="approveAmount"></input>
        </div>
        <button id="approveButton">APPROVE!</button>
      </div>

      {/* ALLOWANCE */}
      <div className="form allowance">
        <h2 style={{ textAlign: "center" }}>ALLOWANCE</h2>
        <div>
          <label>Spender Address: </label><input type="text" id="allowanceSpender"></input>
        </div>
        <div>
          <table>
            <tr>
              <td><b>OWNER</b></td>
              <td id="allowanceSetOwner"></td>
            </tr>
            <tr>
              <td><b>SPENDER</b></td>
              <td id="allowanceSetSpender"></td>
            </tr>
            <tr>
              <td><b>AMOUNT</b></td>
              <td id="allowanceSetAmount"></td>
            </tr>
          </table>
        </div>
        <button id="allowanceButton">SHOW!</button>
      </div>

    </div>
    );
}

ReactDOM.render(<ShowCryo />, document.getElementById('root'));