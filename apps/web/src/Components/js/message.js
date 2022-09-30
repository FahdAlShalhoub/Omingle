import React from 'react';
import '../css/message.css';
import '../css/fonts.css';
import '../css/styles.css';

const Message = (props)=>{
    return  <div className="border-2 border-black mt-3 pt-2 px-2 w-1/2 bg3" id={props.id}> 
    <p className="tracking-wide font2"> <b>{props.sender}</b> : {props.message}</p>
    </div>  ; 
}
export default Message;