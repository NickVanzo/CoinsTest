
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div class="w3-top">
                <div class="w3-row w3-padding w3-black">
                    <div class="w3-col s3">
                        <a href="#" class="w3-button w3-block w3-black">SEND</a>
                    </div>
                    <div class="w3-col s3">
                        <a href="#about" class="w3-button w3-block w3-black">GET INFO</a>
                    </div>
                    <div class="w3-col s3">
                        <a href="#menu" class="w3-button w3-block w3-black">ALLOW</a>
                    </div>
                    <div class="w3-col s3">
                        <a href="#where" class="w3-button w3-block w3-black">TRANSFER FROM</a>
                    </div>
                </div>
            </div>
        )
    }
};

export default Header;
