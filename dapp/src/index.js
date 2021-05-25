import ReactDOM from 'react-dom';
import './constants';
import React from 'react';
import Header from './Header';
import './table.css'
import WebUtil from './Web3Util';
import Firestore from './Firestore';

class ButtonToToken extends React.Component {
  
  render() {
    return (
      <div style={{ textAlign: 'center', paddingTop: '20%' }}>
        <Header />
        <button id="connectButton" style={{ position: "fixed", marginTop: '28em', marginLeft: '40em' }}>Connect</button>
      </div>
    )
  }
}

ReactDOM.render(<ButtonToToken />, document.getElementById('mainContainer'));
