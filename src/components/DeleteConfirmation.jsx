import { useEffect, useState } from "react";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  const [remainingTime , setReaminingTime] = useState(3000)

  useEffect(() => {
    const interval = setInterval(()=>{
      setReaminingTime(prevTime => prevTime - 10 );
    } , 10)
    return 
    clearInterval(interval)
  } , [])
  
//well there are a lot of rernders -- lot of component rerenders 

  useEffect(() => {
      console.log('TIMER SET')
   const timer = setTimeout(()=> {
   onConfirm()
} , 3000)

  return () => {
    clearTimeout(timer);
  }
  } , [onConfirm])

  //CLEAN UP FUNCTION RUNS -- WHEN COMPONENT UNMOUTNS : WHEN A DEPENDENCY CHANGES
  //when this component is removed such that there are alot
  //if you are using



  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remainingTime} max={TIMER}/>
    </div>
  );
}


// state for frequent rerender