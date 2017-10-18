import React, { Component } from 'react';
import { ScrollView, Alert, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Test from './components/test';
import { connect,Provider } from 'react-redux'
import store from './store/store';
import { getDecksFromAPI } from './actions'
import reducer from './reducers'
import { createStore,applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
//import DevToolsApp from 'remotedev-app';

var STORAGE_KEY = '@mobile-flashcards';


//  NativeModules.DevSettings.setIsDebuggingRemotely(true)

const myStore = store(
  reducer,
    applyMiddleware(thunk,logger)
);

export default class App extends Component {

    componentDidMount() {
      //this._loadInitialState().done();
      //this.props.getDecks(STORAGE_KEY);
    //  console.log(this.props)
    }




  render() {

return (
  <Provider store={myStore}>
          <Test />
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
    //height:500,
    //width:50,
    //top:200,
  /*  alignItems: 'center',
    justifyContent: 'center',
    */
    backgroundColor: 'transparent',
    paddingLeft:20,
    paddingRight:20

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
