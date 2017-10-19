import React from 'react';
import { connect } from 'react-redux'
import { TouchableOpacity, Dimensions, ActivityIndicator, TextInput, TouchableNativeFeedback, AsyncStorage, Alert, ScrollView, View,Text,StyleSheet, Button,TouchableHighlight } from 'react-native';
import { getDecks} from '../utils/api'
import { setDecks,setLoaded } from '../actions'
import reducer from '../reducers'
import { StackNavigator } from 'react-navigation';
import Test  from '../components/test'
var STORAGE_KEY = '@mobile-flashcards';



const AddDecks = () => (
  <View>
    <Text>This is the Dashboard</Text>
  </View>
);

  const SeeDecks = ({ navigation }) => (
    <View style={styles.fullContainer}>
      <Test addDeck = {navigation.navigate('AddDecks')}/>
      <Button  title={'Add New Deck'} onPress = {() => navigation.navigate('AddDecks')}/>
    </View>
  );



const Stack = StackNavigator({
  Home: {
    screen: SeeDecks
  },
  AddDecks: {
    screen: AddDecks
  }
})

class Navigator extends React.Component {




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
    height:this.height,
    width:this.width,
    padding:10
  },
})
