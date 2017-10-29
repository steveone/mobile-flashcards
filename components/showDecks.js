import React from 'react';
import { connect } from 'react-redux'
import { DeviceEventEmitter, Dimensions, ActivityIndicator, TextInput, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
import { removeDecks,updateDecks,getDecks} from '../utils/api'
import { addNewDeck,setDecks,setLoaded } from '../actions'
import { Card,FormLabel, FormInput } from 'react-native-elements'
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



class ShowDecks extends React.Component {


refreshFunction(){

}

refresh(){

}

componentDidUpdate(){
  if (loaded != true) {
    setTimeout(this.props.setLoaded,
      1000
    )
  }
}

createNewDeck() {
  console.log("Creating a new deck called " + this.state.newDeckName)
  //clearning newDeckName field
  if (this.state.newDeckName.length < 1) {
    Alert.alert("Please enter a name for your new Deck")
    return
  }
  data = {newDeckName: this.state.newDeckName}

  let retVal = Object.assign({},this.props.decks)
  let newDeckName = this.state.newDeckName
  let newDeck = {
        questions:[],
        title: newDeckName
      }

  retVal[newDeckName] = newDeck
  updateDecks(retVal)

  this.props.addNewDeck({data})
  this.setState({newDeckName:''})
  if (this.state.loaded != true) {
    setTimeout(this.props.setLoaded,
      1000
    )
  }

}

  constructor(props) {
    super(props);
    this.state = { newDeckName: '' };
  }

  shouldComponentUpdate(prevProps, prevState){
    return true
  }

  componentWillUnmount(){
  }

  componentDidMount() {

    //removeDecks()
    //this._saveToAsyncStorage()

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

render(){

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
{decks && Object.keys(decks).map((deck)=>
  <ScrollView style={styles.fullContainer} key={deck + 'sv'}>
<Card title={deck}>
  <TouchableHighlight key={deck + 'th'} onPress = {() =>  this.props.navigation.navigate('Deck',{
    deck:deck,
    totalQuestions:decks[deck]['questions'].length, refresh: this.refreshFunction
  }
)}>
  <Text style={styles.button}>
  <Text>
    Go to quiz deck
  </Text>
  <Text style={styles.buttonText}>
    {"\n" + JSON.stringify(decks[deck]['questions'].length)} questions
  </Text>
  </Text>
  </TouchableHighlight>
</Card>
<Text>
  </Text>


  </ScrollView>
)}
<View style={{top:10, height:200, width:this.width, padding:5}}>
  <FormLabel >Create a new deck by entering a title below:</FormLabel>
  <FormInput
    style={{height: 40, width: this.width, borderColor: 'black' }}
    onChangeText={(newDeckName) => this.setState({newDeckName})}
      value={this.state.newDeckName}
    >
    </FormInput>
    {
      (this.state.newDeckName.length > 0)
      && <Button title="Add New Deck" onPress = {() => {this.createNewDeck(this.state.newDeckName)}}/>
    }
</View>
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
    setLoaded: () => dispatch(setLoaded()),
    addNewDeck: (data) => dispatch(addNewDeck(data)),
  }
}


export default connect(
  mapStateToProps,mapDispatchToProps
)(ShowDecks)
