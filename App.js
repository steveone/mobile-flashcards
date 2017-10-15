import React from 'react';
import { Alert, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Test from './components/test';


var STORAGE_KEY = '@mobile-flashcards';

export default class App extends React.Component {

    componentDidMount() {
      this._loadInitialState().done();
    }


    async _loadInitialState() {
      try {
        var value = await AsyncStorage.getItem(STORAGE_KEY);
        if (value !== null){
          Alert.alert("returned value was ")
          Alert.alert(value)
          this.setState({decks: value['decks'], lastPlayed:['lastPlayed']});
          //this.setState({lastPlayed:null});
        } else {
          Alert.alert('Initialized with no selection on disk.')
          setState({decks:null,lastPlayed:null})
        }
      } catch (error) {
        Alert.alert("there was an error with AsynStorage")
      }
    }


  render() {
    return (
      <View style={styles.container}>
      <Test/>
{/*        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
