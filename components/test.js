import React from 'react';
import { connect } from 'react-redux'
import { AsyncStorage, Alert, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
import { getDecks } from '../utils/api'
import { setDecks } from '../actions'
import reducer from '../reducers'

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


class Test extends React.Component {

  componentDidMount() {
  //  this._loadInitialState().done();
    //this.props.getDecks(STORAGE_KEY);
    getDecks().then((decks) => this.props.setDecks(JSON.parse(decks)))
    console.log("get decks")
    //getDecks().then((decks) => console.log(JSON.parse(decks)))
    console.log("After get")
    console.log("going for props")
    console.log(this.props.decks)
    //console.log(value)
    //console.log("After value")
  }


   _loadInitialState() {
  /*  try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null){
  //      Alert.alert("returned value was ")
        //Alert.alert(value)
//        this.setState({decks: value});
        let test = JSON.parse(value)
        console.log("got initial state")
      //  console.log(test)

//        this.props.setDecks(test)
        //console.log(value)
        //console.log(test['JavasScript'])

        console.log("got props")
        console.log(this.props.decks)
      } else {
        Alert.alert('Initialized with no selection on disk.')
        //setState({decks:null,lastPlayed:null})
      }
    } catch (error) {
      Alert.alert("there was an error with AsynStorage " + error)
      console.log(error)
    }*/
getDecks(STORAGE_KEY)
  }



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
console.log("in render")
console.log(this.props.decks)
return (
  <View style={{flex: 1,flexDirection:'column', height:100}}>
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
    width:250,
    height: 500,
    top:50,
    height:1
  },
  button: {
     marginBottom: 30,
     width: 260,
     height:100,
     alignItems: 'center',
     backgroundColor: '#2196F3'
   },
   buttonText: {
     padding: 20,
     color: 'white'
   }
})


const mapStateToProps = ((state) => (
  {
   decks: state.decks,
}));

function mapDispatchToProps(dispatch) {
  return{
    setDecks: (data) => dispatch(setDecks(data)),
  }
}


export default connect(
  mapStateToProps,mapDispatchToProps
)(Test)
