import React from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, Dimensions, ActivityIndicator, TextInput, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
import { getDecks} from '../utils/api'
import { setDecks,setLoaded } from '../actions'
import reducer from '../reducers'
import { StackNavigator } from 'react-navigation';
import ShowDecks  from '../components/showDecks'
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
      <Button  title={'Add New Deck'} onPress = {() =>  navigation.navigate('AddDecks')}/>
    </View>
  );



const Stack = StackNavigator({
  Home: {
    screen: SeeDecks
  },
  AddDecks: {
    screen: AddDecks
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




export default connect(

)(Navigator)


const styles = StyleSheet.create({
  fullContainer: {
    top:25,
//    backgroundColor: 'red',
    borderColor: 'black',
    borderStyle: 'solid',
//    borderRadius: 20,
    flex: 1,
    height:this.height-500,
    width:this.width-300,
    padding:10
  },
})
