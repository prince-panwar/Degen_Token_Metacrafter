import React from 'react'
import { useState } from 'react'



function Transfer({transfer}) {
 const [account,setAccount] =useState('');
 const [value,setValue] = useState('');

 const HandleSubmit=(e)=>{
      e.preventDefault();
      transfer(account,value);
 }
  return (
    <div>
    <form onSubmit={HandleSubmit}>
      <div className="form-row">
        <label>Enter the account number to transfer</label>
        <br/>
        <input
          value={account}
          placeholder="Account No"
          onChange={(e) => setAccount(e.target.value)}
        />
      </div>
      <div className="form-row">
        <label>Enter the amount</label>
        <br/>
        <input
          value={value}
          placeholder="Amount"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button type="submit">Transfer</button>
    </form>
  </div>
  
  )
}

export default Transfer
