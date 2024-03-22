import {   useRef , useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({open ,  children }, ) {
  const dialog = useRef();

useEffect (() =>{
  if(open){
  dialog.current.showModal()
}else{
  dialog.current.close();
}
} ,[])

  return createPortal(
    <dialog className="modal" ref={dialog} open={open} >
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;


//calling close becasue there are one of the main thing in the end we are all in there for the good that is the thign even if we are not going to do the deed
//right after the component fucntion - 

//use state this is one of te