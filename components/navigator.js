import React from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, Dimensions, ActivityIndicator, TextInput, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
import { getDecks} from '../utils/api'
import { setDecks,setLoaded } from '../actions'
import reducer from '../reducers'
import { StackNavigator } from 'react-navigation';
import ShowDecks  from '../components/showDecks'
import Deck  from '../components/deck'
import Quiz from '../components/quiz'
import AddQuestion from '../components/addQuestion'
var STORAGE_KEY = '@mobile-flashcards';



const AddDecks = ({navigation}) => (
  <View>
    <Text>This is the Dashboard</Text>
    {console.log("in add decks")}
  </View>
);

  const SeeDecks = ({ navigation }) => (
    <View style={styles.fullContainer}>
    {console.log("in seedecks")}
      <ShowDecks/>
      <Button style={styles.button} title={'Add New Deck'} onPress = {() =>  navigation.navigate('AddDecks')}/>
    </View>
  );



const Stack = StackNavigator({
  Home: {
    screen: ShowDecks,
    navigationOptions: ({navigation}) => ({
      title: `Show All Decks`,
    }),
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      title: `Showing Deck: ${navigation.state.params.deck}`,
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({navigation}) => ({
      title: `Quiz on: ${navigation.state.params.deck}`,
    }),
  },
  AddQuestion: {
    screen: AddQuestion,
    navigationOptions: ({navigation}) => ({
      title: `Adding Q/A - Deck ${navigation.state.params.deck}`,
    }),
  },
},{initialRouteName:'Home'})



class Navigator extends React.Component {


componentDidMount(){
  loaded = true
}


render(){
  return (
        <Stack />
      );
    }
}


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
)(Navigator)



const styles = StyleSheet.create({
  fullContainer: {
    top:0,
//    backgroundColor: 'red',
    borderColor: 'black',
    borderStyle: 'solid',
//    borderRadius: 20,
    flex: 1,
    height:this.height-500,
    width:this.width-300,
    padding:10
  },
  button: {
     textAlignVertical:'center',
     textAlign:'center',
     fontSize:30,
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
