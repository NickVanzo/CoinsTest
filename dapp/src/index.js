import ReactDOM from 'react-dom';
import './constants';
import React from 'react';
import Header from './Header';
import Web3Util from './Web3Util';

class ButtonToToken extends React.Component {

  render() {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20%' }}>
        {/* <p onClick={async () => await this.state.bubaContractInstance.getNameOfToken() }>Buba</p>
        <p onClick={async () => await this.state.cryoContractInstance.getNameOfToken()}>Cryo</p> */}
        <Header />
        <button id="connectButton" style={{ position:"fixed", marginTop: '28em', marginLeft: '40em' }}>Connect</button>
      </div>
    )
  }
}

ReactDOM.render(<ButtonToToken />, document.getElementById('mainContainer'));
