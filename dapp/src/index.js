import ReactDOM from 'react-dom';
import { bubaContractAbi, bubaContractAddress, cryoContractAddress, cryoContractAbi, simpContractAddress, simpContractAbi } from './constants';
import './constants';
import React from 'react';
import Contract from './Contract';
import Header from './Header';
import FormFromTransfer from './FormFromTransfer';

class ButtonToToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bubaContractInstance: new Contract(bubaContractAbi, bubaContractAddress),
      cryoContractInstance: new Contract(cryoContractAbi, cryoContractAddress),
      simpContractInstance: new Contract(simpContractAbi, simpContractAddress)
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20%' }}>
        {/* <p onClick={async () => await this.state.bubaContractInstance.getNameOfToken() }>Buba</p>
        <p onClick={async () => await this.state.cryoContractInstance.getNameOfToken()}>Cryo</p> */}
        <Header />
        <FormFromTransfer />
      </div>
    )
  }
}

ReactDOM.render(<ButtonToToken />, document.getElementById('mainContainer'));
