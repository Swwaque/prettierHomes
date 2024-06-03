import React from 'react';
import {ClockLoader } from 'react-spinners';
import './loading.scss'; // Import a separate scss file for styling

const Loading = () => {

  return (
    <div  className="loading-container" >

    <center>
      <img className="pulsate" src="/images/logo.png" alt="" />
    </center>
          
    <ClockLoader color={'#383838'} size={50} aria-label="Loading Spinner" data-testid="loader" />
    
      </div>
      
  );
};

export default Loading;
