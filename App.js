import React, { Component } from 'react';
import { Dimensions, ScrollView, Alert, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Navigator from './components/navigator';
import { connect,Provider } from 'react-redux'
import store from './store/store';
import { getDecksFromAPI } from './actions'
import reducer from './reducers'
import { createStore,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { Notifications, Permissions } from 'expo'
import {setLocalNotification} from './utils/notifications'

var STORAGE_KEY = '@mobile-flashcards';


//  NativeModules.DevSettings.setIsDebuggingRemotely(true)

const myStore = store(
  reducer,
  applyMiddleware(thunk,logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);



export default class App extends Component {



    componentDidMount() {
      //this._loadInitialState().done();
      //this.props.getDecks(STORAGE_KEY);
    //  console.log(this.props)
    const { width, height } = Dimensions.get('window');
    setLocalNotification();
    }




  render() {

return (
  <Provider store={myStore}>
          <Navigator />
      </Provider>
)
}
    /*let decks = this.props
    if (this.props) {
      decks = this.props
//      console.log(decks)
      }

    return (
  <ScrollView style={styles.container} contentContainerStyle={styles.center}>
      <Text>
      d
      </Text>
      <Text>
      {
      (decks && Object.keys(decks)
      .map((cur,val,arry) => {
          decks[cur]
       })
     )
     }
     </Text>

      </ScrollView>


    );
  }*/
}

const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height:this.height-500,
    width:this.width-300,
    justifyContent:'flex-start',
    backgroundColor: 'transparent',

  },

});


const mapStateToProps = ((state) => (
  {
   decks: state.decks,

}));

function mapDispatchToProps(dispatch) {
  return{
  getDecks: (data) => dispatch(getDecksFromAPI(data)),
  }
}

const AppWithNavigationState = connect(mapStateToProps)(App);

/*
export default connect(
  mapStateToProps,
  mapDispatchToProps)(AppWithNavigationState)
*/
