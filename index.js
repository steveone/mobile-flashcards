import React, { Component } from 'react';
import { ScrollView, Alert, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Test from './components/test';
import { connect,Provider } from 'react-redux'
import store from './store/store';
import { getDecksFromAPI } from './actions'
import reducer from './reducers'
import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';


  const myStore = store(
    reducer,
      applyMiddleware(thunk,logger)
  );

  render() {


    return (
      <Provider store={myStore}>
      <App/>
    </Provider>

    )
  }
