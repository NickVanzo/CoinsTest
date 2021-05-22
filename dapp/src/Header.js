
import React from 'react';
import FromFromTransfer from './FormFromTransfer';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlToShow: <FromFromTransfer />
        }
        this.showHtml = this.showHtml.bind(this);
    }

    showHtml(indexOfPage) {
        this.setState(
            {
                htmlToShow: indexOfPage
            }
        )
    }

    render() {
        const htmlToShow = this.state.htmlToShow
        let bodyToShow;

        switch (htmlToShow) {
            case 1:
                bodyToShow = (
                    <FromFromTransfer />
                )
                break;
            case 2:
                bodyToShow = (
                    <h1>Hello</h1>
                )
                break;
            case 3:
                bodyToShow = (
                    <p>Hello 2</p>
                )
                break;
            case 4:
                bodyToShow = (
                    <h2>Hello 3</h2>
                )
                break;
        }

        return (
            <div className="w3-top">
                <div className="w3-row w3-padding w3-black">
                    <div className="w3-col s3">
                        <a href="#" className="w3-button w3-block w3-black" onClick={() => this.showHtml(1)}>SEND</a>
                    </div>
                    <div className="w3-col s3">
                        <a href="#about" className="w3-button w3-block w3-black" onClick={() => this.showHtml(2)}>GET INFO</a>
                    </div>
                    <div className="w3-col s3">
                        <a href="#menu" className="w3-button w3-block w3-black" onClick={() => this.showHtml(3)}>ALLOW</a>
                    </div>
                    <div className="w3-col s3">
                        <a href="#where" className="w3-button w3-block w3-black" onClick={() => this.showHtml(4)}>TRANSFER FROM</a>
                    </div>
                </div>
                {bodyToShow}
            </div>
        )
    }
};

export default Header;
