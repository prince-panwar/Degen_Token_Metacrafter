
import { ethers } from "ethers"
import { useState,useEffect } from "react"
import RandomNumber from "@/Components/randomNumber";
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
    getBalance(currentAccount);
    getInstance();
  }catch(e){setError(e.message)}
}

//get the balance
const getBalance =async (account)=>{
    try{
      const bal = await provider.send('eth_getBalance',[account,'latest']);
      setBalance(ethers.utils.formatEther(bal))
      console.log(balance);
    }catch(e){setError(e.message)}
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
    let tx =await contractIns.mintReward();
    await tx.wait();
    console.log("giveReward called");
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
  <div className="account-info">
    <p className="p-tag">Your Account: {currentAccount}</p>
    <p className="p-tag">Your Balance: {balance}</p>
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
  {currentAccount&&(<RandomNumber giveReward={giveReward}/>)}
  </div>
  </div>
)
 
}

