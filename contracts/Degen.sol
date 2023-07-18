// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";


contract Degen is ERC20 ,Ownable,ERC20Burnable{
 
    constructor() ERC20("Degen","DGN"){}

function mint(address account, uint amount)public  onlyOwner{
    _mint(account, amount);
}

function transferTokens(address to , uint256 amount)external{
    require(balanceOf(msg.sender)>= amount,"You do not have enough tokens");
    approve(msg.sender, amount);
    transferFrom(msg.sender, to, amount);
}

function Burn(uint256 amount) external {
    require(balanceOf(msg.sender)>= amount,"You do not have enough tokens");
     approve(msg.sender, amount);
    burnFrom(msg.sender, amount);
}


function getBalance() external view returns(uint256){
     return this.balanceOf(msg.sender);
}

}


