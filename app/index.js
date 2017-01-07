import React, { Component } from 'react';

import { 
  Router,
  Scene
} from 'react-native-router-flux';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import CardDetail from './card-detail';
import CardList from './card-list';

const App = () => {
  return(
    <Router>
      <Scene key="root">
        <Scene 
            key="card_list"
            component={CardList}
            title="Card List"
            initial
          />
          <Scene 
            key="card_detail"
            component={CardDetail}
            title="Card Detail"
          />
      </Scene>
    </Router>
  );
}

export default App;