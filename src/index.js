import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './routes';
import NavigationService from './services/navigation';

import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Routes
        href={(navigatorRef) => NavigationService.setNavigator(navigatorRef)}
      />
    </Provider>
  );
}

// obs1: made the container styled.ScrollView in cart styles.js
// obs2: made the flatlist vertical on Home because of the sidebars
// obs3: check if css of react-native-tiny-toast is correct
// check propType validation in Cart index.js
