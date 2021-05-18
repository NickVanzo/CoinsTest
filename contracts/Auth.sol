//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

abstract contract Auth {
    modifier isOwnerOfContract(address _owner) {
        require(msg.sender == _owner, "msg.sender != owner of the contracts");
        _;
    }
}