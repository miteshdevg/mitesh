import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigation/Navigation';

const App = () => {
  useEffect(() => {
    Platform.OS === 'android' ? SplashScreen.hide() : ""
  }, []);
  return (

    <Navigation />

  )
}
export default App