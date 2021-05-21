
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="w3-top">
                <div className="w3-row w3-padding w3-black">
                    <div className="w3-col s3">
                        <a href="#" className="w3-button w3-block w3-black">SEND</a>
                    </div>
                    <div className="w3-col s3">
                        <a href="#about" className="w3-button w3-block w3-black">GET INFO</a>
                    </div>
                    <div className="w3-col s3">
                        <a href="#menu" className="w3-button w3-block w3-black">ALLOW</a>
                    </div>
                    <div className="w3-col s3">
                        <a href="#where" className="w3-button w3-block w3-black">TRANSFER FROM</a>
                    </div>
                </div>
            </div>
        )
    }
};

export default Header;
