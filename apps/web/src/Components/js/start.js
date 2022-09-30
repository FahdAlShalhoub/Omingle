import React from 'react';
import '../css/styles.css';
import '../css/fonts.css';

var Start = (props) => {

      return <button
            className=" bg2 rounded-lg shadow-2xl select-none min-w-1/2 mx-auto my-32 text-white text-center " 
                  onClick={props.connect}>
        
            <p className="text-4xl font-normal uppercase font2 m-16">chat with a stranger<br/> Now</p>
              </button>
}

export default Start;