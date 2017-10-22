import React from 'react';
import { connect } from 'react-redux'
import { Dimensions, ActivityIndicator, TextInput, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
import { getDecks} from '../utils/api'
import { setDecks,setLoaded } from '../actions'
import reducer from '../reducers'
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import FlipCard from 'react-native-flip-card'

var STORAGE_KEY = '@mobile-flashcards';

let loadedState = null
let totalQuestions = 0


class Test extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder',
      currentQuestion: 0,
      totalQuestions:0,
      right: 0,
      wrong: 0,
      done: false,
    //deckName: navigation.state.params.deck
    };
    console.log(this.props)
  }



  shouldComponentUpdate(prevProps, prevState){
    return true
  }

  componentDidMount() {
    const { width, height } = Dimensions.get('window');
    //getDecks().then((decks) => this.props.setDecks(JSON.parse(decks)))
    //I want a spinner to show even though loading is fast
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

nextQuestion = (answer) => {
let right = this.state.right;
let wrong = this.state.wrong;
if (answer == "Right") {
   Alert.alert("Good Job")
   right++
   this.setState({right})
 }
else {
  wrong++
  Alert.alert("You'll get it next time")
  this.setState({wrong})
}
 current = this.state.currentQuestion
 current++
 this.setState({currentQuestion:current})
 if ((this.state.right + this.state.wrong) == this.state.totalQuestions) {
   this.setState({done:true})
 }
}

render(){
const showLoading = (this.props.loaded === null) ? true : false
let decks = null
let showingDeck = null
let questions = null
let totalQuestions = 0
if (this.props.decks) {
  decks = this.props.decks
  showingDeck = this.props.navigation.state.params.deck
  }

console.log("showing deck " + showingDeck)
questions = (decks !== null) ? decks[showingDeck]['questions'] : null
totalQuestions = (decks != null) ? decks[showingDeck]['questions'].length : 0
console.log(totalQuestions)
return (
  <View  key='11' style={{flex: 1, height:this.height-500, width:this.width-300}}>
  {(this.props.loaded === null) && (
      <ActivityIndicator
        animating={showLoading}
        color='white'
        backgroundColor='black'
        size='large' />
  )}
{questions
  .filter((element, index) => index == this.state.currentQuestion)
  .map((question, index)=>

  <ScrollView style={styles.fullContainer} key={question.question + 'sv'}>
  <FlipCard  key ={questions.question + 'fc'}
    friction={6}
    perspective={1000}
    flipHorizontal={true}
    flipVertical={false}
    flip={false}
    clickable={true}
    onFlipEnd={(isFlipEnd)=>console.log("we flipped")}
  >
<View style={styles.face}>
  <Text style={styles.button}>
     {question.question}
  </Text>
  </View>
  <View style={styles.back}>
    <Text style={styles.button}>
      {question.answer}
    </Text>
    <Button title="I got it Right :)" onPress = {() =>  this.nextQuestion("Right")}>
    </Button>
    <Button title="I got it Wrong :(" onPress = {() =>  this.nextQuestion("Wrong")}>
    </Button>
    </View>
  </FlipCard>
  </ScrollView>
)}

{(this.state.done) &&
  <Text> Good Job, you have completed the quiz. {'\n'}
   You got {this.state.right} Correct and {this.state.wrong} incorrect.
  </Text>

}
</View>

)}
}

const styles = StyleSheet.create({
  fullContainer: {
    top:25,
//    backgroundColor: 'red',
    borderColor: 'black',
    borderStyle: 'solid',
//    borderRadius: 20,
    flex: 1,
    height:this.height-500,
    width:this.width,
    padding:10
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
)(Test)
