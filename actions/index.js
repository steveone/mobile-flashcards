import getDecksFromAPI from '../utils/api'
//import {AsyncStorage}  from 'react-native'

import {
  ADD_DECKS,
  SET_LOADED,
  SAVE_NEW_QUESTION,
  ADD_NEW_DECK,
//  SET_DECKS,
} from './types';

export function setDecks (data) {
  return{
    type: ADD_DECKS,
    data
  }
}

export function setLoaded(){
  return{
    type:SET_LOADED,
    loaded: true
  }
}

export function saveNewQuestion(data){
  return {
    type:SAVE_NEW_QUESTION,
    data
  }
}

export function addNewDeck(data){
  return{
    type:ADD_NEW_DECK,
    data
  }
}
