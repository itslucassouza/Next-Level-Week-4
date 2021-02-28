import '../styles/global.css';

import { ChellengesProvider } from '../contexts/ChallengesContext';
import { useState } from 'react';


function MyApp({ Component, pageProps }) {

  return (
    <ChellengesProvider>
      
      <Component {...pageProps} />
   
    </ChellengesProvider>
  )
}

export default MyApp;
