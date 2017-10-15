import React from 'react';
import { AsyncStorage, Alert, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
var STORAGE_KEY = '@mobile-flashcards';

let deck = {
  React: {
  title: 'React',
  questions: [
    {
      question: 'What is React?',
      answer: 'A library for managing user interfaces'
    },
    {
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event'
    }
  ]
},
JavaScript: {
  title: 'JavaScript',
  questions: [
    {
      question: 'What is a closure?',
      answer: 'The combination of a function and the lexical environment within which that function was declared.'
    }
  ]
}
};


export default class Test extends React.Component {


  async  _saveToAsyncStorage() {
     try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
      Alert.alert('Saved selection to disk');
    } catch (error) {
     Alert.alert('AsyncStorage error: ' + error.message);
    }
   }

   async  _readFromAsyncStorage() {
      Alert.alert('We will attempt to store into AsyncStorage!')
      try {
       await AsyncStorage.getItem(STORAGE_KEY, (err,result) => {
         Alert.alert(result)
       });
     } catch (error) {
      Alert.alert('AsyncStorage error: ' + error.message);
     }
    }

render(){
return (
  <View style={{flex: 1,flexDirection:'column'}}>
    <View style={styles.container}>
        <TouchableHighlight onPress={this._saveToAsyncStorage} underlayColor="white">
          <Text style={styles.buttonText}>
            Save to Async Storage
          </Text>
        </TouchableHighlight>

    </View>
    <View style={styles.container} >
    <TouchableHighlight onPress={this._readFromAsyncStorage} underlayColor="white">
      <Text style={styles.buttonText}>
        Get from Async Storage
      </Text>
    </TouchableHighlight>
    </View>
  </View>
)}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    width:50,
    height: 500,
    top:50,
    height:1
  },
  button: {
     marginBottom: 30,
     width: 260,
     alignItems: 'center',
     backgroundColor: '#2196F3'
   },
   buttonText: {
     padding: 20,
     color: 'white'
   }
})
