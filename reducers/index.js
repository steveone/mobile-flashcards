import { combineReducers } from 'redux'

import {
  ADD_NEW_POST,
  REMOVE_POST,
} from '../actions/types'

const initialQuestions = {
  /*React: {
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
  }*/
};

const lastPlayed = {
  /*lastPlayed*/
}

export default combineReducers({
  questions,
  lastPlayed,
})
