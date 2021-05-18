// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "./SafeMath.sol";
import "./IERC20.sol";

    contract CryoCoin is IERC20 {
        using SafeMath for uint;
        
        // private + sicure;
        string private tokenName;
        string private tokenSymbol;
        uint8  private tokenDecimals;
      
        
        //totalSupply
        uint256 private tokenTotalSupply;
        
        mapping(address => uint) balance;
        mapping(address=>mapping(address=>uint))allowed;
        
        //constructor
        constructor()  {
            tokenName        ="CryoCoin";
            tokenSymbol     ="CRC";
            tokenDecimals   = 18;
            tokenTotalSupply= 104000000;
            balance[msg.sender] = tokenTotalSupply;
            
            
        }
        
        function name() public override view returns (string memory) {
            return tokenName;
        } 
        function symbol() public override view returns (string memory) {
            return tokenSymbol;
        }
         function decimals() public override view returns (uint8) {
             return tokenDecimals;
         }
        function totalSupply () public override view returns (uint256 balances) {
            return tokenTotalSupply;
        }
        function balanceOf (address _owner) public override view returns (uint256 balances) {
            return balance[_owner];
        }
        function transfer(address _to, uint256 _value) public override returns (bool success) {
            balance[msg.sender] = balance[msg.sender].sub(_value);
            balance[_to] = balance[_to].add(_value);
            emit Transfer(msg.sender, _to, _value);
            return true;
        }
        function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
            balance[_from] = balance[_from].sub(_value);
            balance[_to]   = balance[_to].add(_value);
            emit Transfer(_from, _to, _value);
            return true;
            
        }
        function approve(address _spender, uint256 _value) public override returns (bool success) {
            allowed [msg.sender][_spender] = _value;
            emit Approval(msg.sender, _spender, _value);
            return true;
        }
         function allowance(address _owner, address _spender) public override view returns (uint256 remaining) {
             return allowed [_owner][_spender];
         }
    }