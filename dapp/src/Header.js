
import React from 'react';
import FormTransfer from './FormTransfer';
import Info from './Info';
import FormAllowance from './FormAllowance';

import TransferFrom from './TransferFrom';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            htmlToShow: <FormTransfer />
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
                    <FormTransfer />
                )
                break;
            case 2:
                bodyToShow = (
                    <Info />
                )
                break;
            case 3:
                bodyToShow = (
                    <FormAllowance />
                )
                break;
            case 4:
                bodyToShow = (
                    <TransferFrom />
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
