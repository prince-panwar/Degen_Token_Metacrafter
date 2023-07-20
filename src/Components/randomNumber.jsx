import { useState } from "react";
const RandomNumber=({giveReward})=>{
    const [guess,setGuess]= useState('');
  const [message,setMessage]= useState('');
  const [randomNum,setRandomNum]= useState('');
  const [isGenerated,setIsGenerated]=useState(false);
  const [count,setCount]=useState(0);
  function Reward(){
    giveReward();
  }
    function generateRandomNumber(){
         setRandomNum(Math.floor(Math.random()*10)+1);
         setIsGenerated(!isGenerated);
         setMessage('');
    }
     const HandleGuess=()=>{
         if(count>=2&&guess!=randomNum){
          setMessage("You Lost! Play Again")
          setCount(0);
          setGuess('');
          setIsGenerated(!isGenerated);
         }else{
  
        if(guess==randomNum){ 
          setMessage("Congratulations! You guessed the right number!'");
          Reward();
          setIsGenerated(!isGenerated);
          setCount(0);
          
      }else if(guess<randomNum){
        setMessage("Too low! try again");
        setCount(count+1);
        setGuess('');

      }else if(guess>randomNum){
        setMessage("Too High! try again");
        setCount(count+1);
        setGuess('');
      }
    }
     }
  
     return(
      <div style={{textAlign:"center"}}>
      <p style={{fontSize:"18px"}} >Random Number Game</p>
      
      {isGenerated?(
     <div>
     <p>Attempt {count}</p>
     <input
       type="number"
       value={guess}
       onChange={(e) => setGuess(e.target.value)}
       placeholder="Enter your guess (1-10)"
       style={{ fontSize: '18px', marginBottom: '10px' }} // Add inline styles
     />
     <br /> {/* Add a line break to place the button below the input */}
     <button onClick={HandleGuess} style={{ fontSize: '20px' }}>Guess</button>
   </div>
         ):(
          <button onClick={generateRandomNumber}>Generate</button>
        )}
          <p>{message}</p>
    </div>
     )
  
  }
  export default RandomNumber;