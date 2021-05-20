// //SPDX-License-Identifier: MIT

pragma solidity 0.8.4;
import "./SafeMath.sol";
import "./IERC20.sol";
import "./Auth.sol";

/*
    To-do: add some security feature
 */
contract MyERC20Token is IERC20, Auth {
    using SafeMath for uint;
    TokenSummary public tokenSummary;
    /*
        Internal: can only be called from this contract.
     */
    mapping(address => uint256) internal balances;
    mapping(address => mapping (address => uint256)) allowed;

    uint256 internal totalSupplyToken = 21000000;
    address private owner;

    struct TokenSummary {
        string _name;
        string _symbol;
        address _initialAccount;
    }
    /*
        Memory data lives until the execution of the function.
        Why doesn't initialAccount have 'memory'?
        Payable: it can receive ether, this function modifies the state of the EVM because it is payable. (pag. 147 ETH book)
        The inital balance is stored in a storage mapping (balances).
     */
    constructor() {
        owner = msg.sender;
        balances[msg.sender] = totalSupplyToken;
        tokenSummary = TokenSummary("BubaCoins", "BUBA", msg.sender);
    }

    function transfer(address _to, uint256 _value) public override returns (bool)  {
        require(balances[msg.sender] >= _value);
        require(_to != address(0));

        balances[msg.sender] = balances[msg.sender].sub(_value);
        balances[_to] = balances[_to].add(_value);  

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public override returns (bool) {
        require(_spender != address(0));
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool) {
        require(balances[_from] >= _value);
        require(allowed[_from][msg.sender] >= _value);
        
        balances[_from] = balances[_from].sub(_value);
        balances[_to] = balances[_to].add(_value);
        allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);

        emit Transfer(_from, _to, _value);
        return true;
    }

    function totalSupply() public override view returns (uint256) {
        return totalSupplyToken;
    }

    function balanceOf(address _account) public override view returns (uint256) {
        return balances[_account];
    } 

    function allowance(address _owner, address _spender) public override view returns (uint256) {
        return allowed[_owner][_spender];
    }

    function name() public override view returns (string memory){
        return tokenSummary._name;
    }

    function symbol() public override view returns (string memory) {
        return tokenSummary._symbol;
    }

    function decimals() public override pure returns (uint8) {
        return 8;
    }

    function burn(uint256 _value) isOwnerOfContract(owner) public returns (bool) { 
        balances[msg.sender] = balances[msg.sender].sub(_value);
        totalSupplyToken = totalSupplyToken.sub(_value);
        emit Burn(msg.sender, _value);
        return true;
    }

    function mint(address _account, uint256 _value) isOwnerOfContract(owner) public returns (bool success) {
        balances[_account] = balances[_account].add(_value);
        totalSupplyToken = totalSupplyToken.add(_value);
        emit Transfer(address(0), _account, _value);
        emit Mint(_account, _value);
        return true;
    }

    event Mint(address account, uint256 value);
    event Burn(address account, uint256 value);
}