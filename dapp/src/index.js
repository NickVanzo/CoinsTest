import ReactDOM from 'react-dom';
import './constants';
import React from 'react';
import Header from './Header';

class ButtonToToken extends React.Component {

  render() {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20%' }}>
        {/* <p onClick={async () => await this.state.bubaContractInstance.getNameOfToken() }>Buba</p>
        <p onClick={async () => await this.state.cryoContractInstance.getNameOfToken()}>Cryo</p> */}
        <Header />
      </div>
    )
  }
}

ReactDOM.render(<ButtonToToken />, document.getElementById('mainContainer'));
