import React from 'react';
import Showsimp from './ShowSimp';
import Showcryo from './ShowCryo';
import Showbuba from './ShowBuba';

class Info extends React.Component {
    render() {
        return (
            <div>
                <h1>Info on Buba</h1>
                <Showbuba />
                <h1>Info on Cryo</h1>
                <Showcryo />
                <h1>Info on Simp</h1>
                <Showsimp />
            </div>
        )
    }
}

export default Info