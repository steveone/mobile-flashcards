import getDecksFromAPI from '../utils/api'
//import {AsyncStorage}  from 'react-native'

import {
  ADD_DECKS,
//  SET_DECKS,
} from './types';

export function setDecks (data) {
  return{
    type: ADD_DECKS,
    data
  }
}

/*export const getDecks = (key) => dispatch =>(
  //getDecksFromAPI()
  AsyncStorage.getItem('@mobile-flashcards')
  .then(results => {
    console.log("ASDfasd")
    const data= JSON.parse(results)
    dispatch(getDecksReturned(data)
      )}
    )
  )*/


/*

  export const setDecks = (key) => dispatch =>(
        dispatch(SET_DECKS(data))
        )
*/


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
