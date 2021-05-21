import React from 'react';

class FromFromTrasnfer extends React.Component {
    render() {
        return (
            <div>
                <p><input class="w3-input w3-padding-16 w3-border" type="text" placeholder="Address Spender" required name="addressSpender" /></p>
                <p><input class="w3-input w3-padding-16 w3-border" type="number" placeholder="Number of token" required name="amountToken" /></p>
                <p><button class="w3-button w3-black" type="submit">TRANSFER</button></p>
            </div>
        )
    }
}

export default FromFromTrasnfer;