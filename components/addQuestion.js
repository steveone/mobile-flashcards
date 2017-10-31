import React from 'react';
import { connect } from 'react-redux'
import { Dimensions, ActivityIndicator, TextInput, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
import { removeDecks,updateDecks,getDecks} from '../utils/api'
import { FormLabel, FormInput } from 'react-native-elements'
import { setDecks,setLoaded,saveNewQuestion } from '../actions'
import reducer from '../reducers'
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'

var STORAGE_KEY = '@mobile-flashcards';

let loadedState = null

class AddQuestion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      newAnswer: '',
      newQuestion:''
    };
  }

  shouldComponentUpdate(prevProps, prevState){
    return true
  }

  componentDidMount() {
    const { width, height } = Dimensions.get('window');
    //getDecks().then((decks) => this.props.setDecks(JSON.parse(decks)))
    //I want a spinner to show even though loading is fast
    setTimeout(this.props.setLoaded,
    1000
    )
  }

  componentDidUpdate(){
    if (this.state.loaded != true) {
      setTimeout(this.props.setLoaded,
      1000
      )
    }
  }

   _loadInitialState() {

  }



  async  _saveToAsyncStorage() {
     try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.deck));
      //Alert.alert('Saved selection to disk');
      Alert.alert("written to async storage")
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

  let data={
    deck,
    question:newQuestion,
    answer:newAnswer,
  }

  let decks = this.props.decks
  console.log("deck is " + deck)
  let newQuestion = {
    question: newQuestion,
    answer: newAnswer
  }
  let retVal = Object.assign({},decks)
      Object.keys(retVal).map( (currentValue, index, arry) => {
        console.log("currentValue" + currentValue)
          if (currentValue === deck) {
            console.log("in if")
            console.log(retVal[currentValue])
            console.log(newQuestion)
            let questionCount = retVal[currentValue].questions.length
              retVal[currentValue].questions.push(newQuestion);
              console.log("in if where deck was found")
              console.log(retVal)
              return retVal
            }
            else { return retVal[index]}
        });
  console.log("before remove decks")
  console.log(retVal)
  console.log("still before removing deck")
  removeDecks().then(() => updateDecks(retVal))

  try{
    console.log(this.props)
    this.props.saveNewQuestion(data)
  } catch(error){
  //Alert.alert('redux error: ' + error.message);
  console.log(error.message)
 }

  this.setState({newQuestion:'',newAnswer:''})
}


render(){

const showLoading = (this.props.loaded === null) ? true : false
let decks = null
if (this.props.decks) {
  decks = this.props.decks
  }
  else {
    decks = null
  }
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

  <View style={{top:50, height:300, width:this.width, padding:10}}>
    <FormLabel>Enter New Question below:</FormLabel>
    <FormInput
      style={{height: 40, width: this.width}}
      onChangeText={(newQuestion) => this.setState({newQuestion})}
        value={this.state.newQuestion}
      >
      </FormInput>
      <FormLabel>Enter Answer below:</FormLabel>
      <FormInput
        style={{height: 40, width: this.width}}
        onChangeText={(newAnswer) => this.setState({newAnswer})}
          value={this.state.newAnswer}
        >
        </FormInput>
        {(this.state.newAnswer.length > 0) && (this.state.newQuestion.length > 0) &&
        <Button title= {`Save Question/Answer to ${deck}`} key={deck + 'aq'} onPress = {() =>  this.saveQuestionToDeck()}>
        </Button>
      }
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
    height: 150,
  },
  button: {
     textAlignVertical:'center',
     textAlign:'center',
     fontSize:30,
     padding: 5,
     marginBottom: 3,
     marginTop:3,
     width: this.width/2,
     height:150,
     alignItems: 'center',
     backgroundColor: '#2196F3',
     borderColor: 'blue',
     borderWidth:1
   },
   buttonSmall: {
      textAlignVertical:'center',
      textAlign:'center',
      fontSize:30,
      padding: 5,
      marginBottom: 3,
      marginTop:3,
      width: this.width/2,
      height:50,
      alignItems: 'center',
      backgroundColor: '#2196F3',
      borderColor: 'blue',
      borderWidth:1
    },
   buttonText: {
     fontSize: 15,
     padding: 20,
     width: 100,
     height:50,
     color: 'white',
     textAlignVertical:'center',
     textAlign:'center'
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
    setLoaded: () => dispatch(setLoaded()),
    saveNewQuestion: (data) => dispatch(saveNewQuestion(data)),
  }
}


export default connect(
  mapStateToProps,mapDispatchToProps
)(AddQuestion)
