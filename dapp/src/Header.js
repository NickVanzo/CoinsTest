
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
            default:
                bodyToShow = (
                    <Info />
                )
                break;
        }

        return (
            <div className="w3-top">
                <div className="w3-row w3-padding w3-black">
                    <div className="w3-col s3">
                        <button className="w3-button w3-block w3-black" onClick={() => this.showHtml(1)}>SEND</button>
                    </div>
                    <div className="w3-col s3">
                        <button className="w3-button w3-block w3-black" onClick={() => this.showHtml(2)}>GET INFO</button>
                    </div>
                    <div className="w3-col s3">
                        <button className="w3-button w3-block w3-black" onClick={() => this.showHtml(3)}>ALLOW</button>
                    </div>
                    <div className="w3-col s3">
                        <button className="w3-button w3-block w3-black" onClick={() => this.showHtml(4)}>TRANSFER FROM</button>
                    </div>
                </div>
                {bodyToShow}
            </div>
        )
    }
};

export default Header;
