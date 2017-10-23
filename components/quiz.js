import React from 'react';
import { connect } from 'react-redux'
import { Modal, Dimensions, ActivityIndicator, TextInput, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
import { getDecks} from '../utils/api'
import { setDecks,setLoaded } from '../actions'
import reducer from '../reducers'
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
import FlipCard from 'react-native-flip-card'
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'react-native-elements'

var STORAGE_KEY = '@mobile-flashcards';

let loadedState = null
let totalQuestions = 0


class Quiz extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Placeholder',
      currentQuestion: 0,
      totalQuestions:0,
      right: 0,
      wrong: 0,
      done: false,
      modalVisible: false,
      lastAnswer:null,
    };
    console.log(this.props)
  }



  shouldComponentUpdate(prevProps, prevState){
    return true
  }

  componentDidMount() {
    const { width, height } = Dimensions.get('window');
    if (this.props.decks) {
      decks = this.props.decks
      showingDeck = this.props.navigation.state.params.deck
      totalQuestions = this.props.navigation.state.params.totalQuestions
      }
    if ((decks !== null) && (showingDeck !== null)) {
      totalQuestions = decks[showingDeck]['questions'].length
    }
    else {
      totalQuestions = 0
    }
    if (this.state.totalQuestions !== totalQuestions) {
      this.setState({totalQuestions})
    }
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

restartQuiz = () => {
  this.setState({
    wrong:0,
    right:0,
    currentQuestion:0,
    done:false,
  })
  console.log("the quiz should be restarting")
}

closeModal = () => {
  this.setState({modalVisible:false})
  let right = this.state.right;
  let wrong = this.state.wrong;
  let current = this.state.currentQuestion
  current++
  console.log("current question = " + current)
  this.setState({currentQuestion:current})
  let totalAnswered = (right + wrong)
  console.log("total answered is " + totalAnswered)
  console.log(totalAnswered)
  console.log(this.state.totalQuestions)
  if (totalAnswered === this.state.totalQuestions) {
    this.setState({done:true})
    console.log("setting done to true")
  }
}

moveToNextQuestion = () => {

  setTimeout(()=>{this.closeModal()} , 2000)
}

nextQuestion = (answer) => {
let right = this.state.right;
let wrong = this.state.wrong;
let lastAnswer = answer;
if (answer === "Right") {
//   Alert.alert("Good job")
   right++
   console.log("right is now " + right)
//   this.setState({right})
 }
else {
  //Alert.alert("You'll get it next time")
  wrong++
  console.log("wrong is now " + wrong)
//  this.setState({wrong})
  }
//setTimeout(this.moveToNextQuestion(),1000)
this.setState({modalVisible:true,right,wrong,lastAnswer:answer})
this.moveToNextQuestion()
}

render(){
const {goBack} = this.props.navigation;
const showLoading = (this.props.loaded === null) ? true : false
let decks = null
let showingDeck = null
let questions = null
let totalQuestions = 0
if (this.props.decks) {
  decks = this.props.decks
  showingDeck = this.props.navigation.state.params.deck
  totalQuestions = this.props.navigation.state.params.totalQuestions
  }

questions = (decks !== null) ? decks[showingDeck]['questions'] : null

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
  <Modal animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log("closing modal")}
          >
        <ScrollView style={styles.fullContainer}>
          <Text style={styles.buttonLarge}>
          {(this.state.lastAnswer == 'Right') ? "Good Job" : "You'll get it next time"}
           {'\n'}
           <Icon name="mood" style={{width:100,height:100}}/>
          </Text>
        </ScrollView>
    </Modal>
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

{(this.state.done === true) &&
  <View style={styles.fullContainer} key={'quizDone'}>
  <Text style={styles.completed}>You have completed the quiz. {'\n'}
   You got {this.state.right} Correct and {this.state.wrong} incorrect.
  </Text>
  <Button title="Restart" onPress = {() => this.restartQuiz()}>
  </Button>
  <Button title="Back to Deck list" onPress = {() => goBack()}>
  </Button>
  </View>

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
   buttonLarge: {
      textAlignVertical:'center',
      textAlign:'center',
      fontSize:30,
      padding: 5,
      marginBottom: 3,
      marginTop:3,
      width: this.width/2,
      height:300,
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
   completed: {
      textAlignVertical:'center',
      textAlign:'center',
      fontSize:20,
      padding: 5,
      marginBottom: 3,
      marginTop:3,
      width: this.width/2,
      height:200,
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
)(Quiz)