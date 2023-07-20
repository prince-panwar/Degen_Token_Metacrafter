
import { ethers } from "ethers"
import { useState,useEffect } from "react"
import RandomNumber from "@/Components/randomNumber";
import Transfer from "@/Components/transfer";
import detectEthereumProvider from "@metamask/detect-provider";
import abi from "../../artifacts/contracts/Degen.sol/Degen.json";

export default function Home() {
 const [provider,setProvider]=useState(undefined);
  const [balance,setBalance]=useState(undefined);
  const [contractIns, setContractIns]=useState(undefined);
  const [currentAccount,setCurrentAccount]=useState(undefined);
  const[isShop,setIsShop]=useState(false);
  const [isTransfer,setIsTransfer]=useState(false);
  const [error,setError]=useState(undefined);
 
  
  const contract_address= "0x2D09447BB5C28678956cEB0dd88ECcdC7F35ADD4";
  const contractABI=abi.abi;
//detect the wallet
  useEffect(()=>{
async function getProvider(){
  const ETHProvider=await detectEthereumProvider();
  if(ETHProvider){
    setProvider(new ethers.BrowserProvider(ETHProvider));
  }else{
    setError("Metamask not detected");
  }
}
getProvider();
},[]);

//connect the wallet
const connectWallet= async ()=>{
  try{
    const account=await provider.send('eth_requestAccounts',[]);

    setCurrentAccount(account[0]);
   getInstance();
  getBalance();
  }catch(e){setError(e.message)}
}

//get the balance
const getBalance= async()=>{
   try {
      if (contractIns) {
        const balance = await contractIns.getBalance();
        setBalance(Number(ethers.formatUnits(balance))); 
        console.log(balance);
      }
  }catch (err){
    console.error(err);
  }
  }

//get instance to the deplyed contract

const getInstance = async ()=>{
 
  const signer =  await provider.getSigner();
  const contractInstance = new ethers.Contract(contract_address,contractABI,signer);
  setContractIns(contractInstance);
}

//fundtion for game reward

const giveReward = async ()=>{
  if(contractIns){
    let tx =await contractIns.mint(currentAccount,5);
    await tx.wait();
    console.log("giveReward called");
    getBalance();
    
  }
}

const transfer = async (account,value)=>{
if(contractIns){
  let tx = await contractIns.transferTokens(account,value);
  await tx.wait();
  console.log("Trnasfered "+value);
  getBalance();
}
}

//initial connect wallet UI
const connect = ()=>{
  if(!provider){
    return <p> Please install MetaMask in order to login</p>
  }
 
  if(balance==undefined){
    getBalance();
  }
  if(currentAccount){
  return (
    <div className="centered-container">
  <div className="navbar">
  <div className="account-info">
    <p className="p-tag">Your Account: {currentAccount}</p>
    <button className="button" onClick={() => setIsTransfer(!isTransfer)}>transfer</button>
    <button className="button" onClick={() => setIsShop(!isShop)}>Shop</button>
    <p className="p-tag">Your Balance: {balance}</p>
  </div>
</div>

 <div>
 <p className="game-description">
              <em>This is a guessing game.</em>
              <br />
              <em>You have to guess a number between 1 to 10.</em>
              <br />
              <em>
                A correct guess will get you 5 DGN.you will have 3 chances to guess the correct number. You can transfer those to
                your friend or buy items from the shop.
              </em>
            </p>
 </div>
</div>
  )}
}





return(
  <div className="outer-container">
    <div>{connect()}</div>
  <div className="inner-container">
   {!currentAccount&&(<button className="connectBtn" onClick={connectWallet}>Connect Wallet</button>)}
   {currentAccount&&isTransfer&&!isShop&&(<Transfer transfer={transfer}/>)}
  {currentAccount&&!isTransfer&&!isShop&&(<RandomNumber giveReward={giveReward}/>)}
 
  </div>
  </div>
)
 
}

