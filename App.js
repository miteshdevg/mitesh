import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './src/navigation/Navigation';

export default App = () => {
  return (
    <Provider store={store}>
    <Navigation />
    </Provider>
  )
}