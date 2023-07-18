
import { ethers } from "ethers"
import { useState,useEffect } from "react"
import detectEthereumProvider from "@metamask/detect-provider";
import abi from "../../artifacts/contracts/Degen.sol/Degen.json";
export default function Home() {
 const [provider,setProvider]=useState(undefined);
  const [balance,setBalance]=useState(undefined);
  const [currentAccount,setCurrentAccount]=useState(undefined);
  const[isShop,setIsShop]=useState(false);
  const [isTransfer,setIsTransfer]=useState(false);
  const [error,setError]=useState(undefined);
 
  
  const [value, setValue] = useState('');
  const contract_address= "0xCa5A0CE564eF2846E47Faf602F4442a3F12f4bf7";
  const contractABI=abi.abi;
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

const connectWallet= async ()=>{
  try{
    const account=await provider.send('eth_requestAccounts',[]);

    setCurrentAccount(account[0]);
    getBalance(currentAccount);
  }catch(e){setError(e.message)}
}
const getBalance =async (account)=>{
    try{
      const bal = await provider.send('eth_getBalance',[account,'latest']);
      setBalance(ethers.utils.formatEther(bal));
    }catch(e){setError(e.message)}
}

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
   <p>This is a guessing game, you have to guess a number between 1 to 5 . correct guess will get yout 5 DGN ,you can transfer those to your friend of buy items from the shop</p>
 </div>
</div>
  )}
}








return(
  <div className="outer-container">
    <div>{connect()}</div>
  <div className="inner-container">
   {!currentAccount&&(<button className="connectBtn" onClick={connectWallet}>Connect Wallet</button>)}

  </div>
  </div>
)
 
}
