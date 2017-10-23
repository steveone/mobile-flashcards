import React from 'react';
import { connect } from 'react-redux'
import { Dimensions, ActivityIndicator, TextInput, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
import { getDecks} from '../utils/api'
import { setDecks,setLoaded } from '../actions'
import reducer from '../reducers'
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'

var STORAGE_KEY = '@mobile-flashcards';

let loadedState = null

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



class AddQuestion extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      newAnswer: null,
      newQuestion:null
    };
  }

  shouldComponentUpdate(prevProps, prevState){
    return true
  }

  componentDidMount() {
    const { width, height } = Dimensions.get('window');
    getDecks().then((decks) => this.props.setDecks(JSON.parse(decks)))
    //I want a spinner to show even though loading is fast
    setTimeout(this.props.setLoaded,
    1000
    )
  }


   _loadInitialState() {

  }

outputLog = () => {
   console.log("got pressed with value " + this.state.text)
   //this._saveToAsyncStorage()
 }

  async  _saveToAsyncStorage() {
     try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(deck));
      //Alert.alert('Saved selection to disk');
    } catch (error) {
     Alert.alert('AsyncStorage error: ' + error.message);
    }
   }


   async  _readFromAsyncStorage() {
      //Alert.alert('We will attempt to store into AsyncStorage!')
      try {
       await AsyncStorage.getItem(STORAGE_KEY, (err,result) => {
         Alert.alert(result)
       });
     } catch (error) {
      Alert.alert('AsyncStorage error: ' + error.message);
     }
    }

saveQuestionToDeck = () => {
  deck = this.props.navigation.state.params.deck
  newQuestion = this.state.newQuestion
  newAnswer = this.state.newAnswer

  console.log("Saving question " + newQuestion)
  console.log("With Answer " + newAnswer)
  console.log("To Deck " + deck)


  this.setState({newQuestion:null,newAnswer:null})
}


render(){
console.log("in render")
//console.log(this.props.decks)
//console.log(decks)
//console.log(this.props.loaded)
const showLoading = (this.props.loaded === null) ? true : false
let decks = null
if (this.props.decks) {
  decks = this.props.decks
  }
  else {
    decks = null
  }
console.log("next decks")
console.log(decks)
return (

  <View  key='11' style={{flex: 1, height:this.height-500, width:this.width-300}}>

  {(this.props.loaded === null) && (
      <ActivityIndicator
        animating={showLoading}
        color='white'
        backgroundColor='black'
        size='large' />
  )}

  <ScrollView style={styles.fullContainer}>
{decks && Object.keys(decks)
  .filter((deck, index) => deck == this.props.navigation.state.params.deck)
  .map((deck)=>
  <ScrollView style={styles.fullContainer} key={deck + 'sv'}>

  <Text style={styles.button}>
  <Text>
    Adding Questions/Answers to "{deck}" deck
  </Text>
  <Text style={styles.buttonText}>
    {"\n"} Currently {JSON.stringify(decks[deck]['questions'].length)} questions
  </Text>
  </Text>

  <View style={{top:50, height:200, width:this.width, padding:10}}>
    <Text>Enter New Question below:</Text>
    <TextInput
      style={{height: 40, width: this.width, borderColor: 'grey',  borderWidth: 1}}
      onChangeText={(newQuestion) => this.setState({newQuestion})}
        value={this.state.newQuestion}
      >
      </TextInput>
      <Text>Enter Answer below:</Text>
      <TextInput
        style={{height: 40, width: this.width, borderColor: 'grey',  borderWidth: 1}}
        onChangeText={(newAnswer) => this.setState({newAnswer})}
          value={this.state.newAnswer}
        >
        </TextInput>
        <TouchableHighlight key={deck + 'aq'} onPress = {() =>  this.saveQuestionToDeck()}>
        <Text style={styles.button}>
        <Text style={styles.buttonText}>
          Save Question/Answer to {deck}
        </Text>

        </Text>
        </TouchableHighlight>
</View>
  </ScrollView>
)}

</ScrollView>
</View>

)}
}

const styles = StyleSheet.create({
  fullContainer: {
//    top:0,
//    backgroundColor: 'red',
    borderColor: 'black',
    borderStyle: 'solid',
//    borderRadius: 20,
    flex: 1,
    height:this.height-500,
    width:this.width,
  //  padding:10
  },
  container: {
    top:20,
    backgroundColor: 'red',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    width:50,
    height: 50,
  },
  button: {
     textAlignVertical:'center',
     textAlign:'center',
     fontSize:30,
     padding: 5,
     marginBottom: 3,
     marginTop:3,
     width: this.width/2,
     height:100,
     alignItems: 'center',
     backgroundColor: '#2196F3',
     borderColor: 'blue',
     borderWidth:1
   },
   buttonText: {
     fontSize: 15,
     padding: 20,
     width: 100,
     height:100,
     color: 'white'
   }
})



const mapStateToProps = ((state) => (
  {
   decks: state.decks,
   loaded: state.loaded,
}));

function mapDispatchToProps(dispatch) {
  return{
    setDecks: (data) => dispatch(setDecks(data)),
    setLoaded: () => dispatch(setLoaded())
  }
}


export default connect(
  mapStateToProps,mapDispatchToProps
)(AddQuestion)