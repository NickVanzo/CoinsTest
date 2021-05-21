import ReactDOM from 'react-dom';
import {bubaContractAbi, bubaContractAddress, cryoContractAddress, cryoContractAbi,simpContractAddress,simpContractAbi} from './constants';
import './constants';
import React from 'react';
import Contract from './Contract';

class ButtonToToken extends React.Component {
  render() {
    const bubaContractInstance = new Contract(bubaContractAbi, bubaContractAddress);
    const cryoContractInstance = new Contract(cryoContractAbi, cryoContractAddress);
    const simpContractInstance = new Contract(simpContractAbi, simpContractAddress);
    console.log(bubaContractInstance.getNameOfToken());
    return (
      <div style={{ textAlign: 'center', paddingTop: '20%' }}>
        <button onClick={async () => bubaContractInstance.getNameOfToken()}>Buba</button>
        <button onClick={async () => cryoContractInstance.getNameOfToken()}>Cryo</button>
        <button onClick={async () => simpContractInstance.getNameOfToken()}>Simp</button>
      </div>
    )
  }
}

ReactDOM.render(<ButtonToToken />, document.getElementById('mainContainer'));