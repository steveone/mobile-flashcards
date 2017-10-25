import { combineReducers } from 'redux'
import _ from 'lodash'

import {
  ADD_DECKS,
  SET_DECKS,
  SET_LOADED,
  SAVE_NEW_QUESTION
} from '../actions/types'

const initialQuestions = null;

const lastPlayed = {
  /*lastPlayed*/
}

function loaded (state = {}, action){
  switch (action.type){
    case SET_LOADED:
    return {...state,
     loaded:true
    }
  default:
    return  null
  }
}

function decks (state = {}, action) {
//console.log("in reducer")
//console.log(action.data)
  switch (action.type) {
    case SET_DECKS:
      return {
        ...state, ...action
      }
    case ADD_DECKS:
    return {
      ...state,...action.data
      }
    case SAVE_NEW_QUESTION:
    let deck = action.data.deck
    console.log("deck is")
    console.log(action.data)
    let newQuestion = {
      question: action.data.newQuestion,
      answer: action.data.newAnswer
    }
//    let retVal = Object.assign({},state.decks)
  let retVal = null
    _.assign(retVal,state.decks)
    _.keys(retVal)
    .map( (currentValue, index, arry) => {
      if (currentValue === deck) {
        let questionCount = retVal[currentValue].questions.length
        retVal[currentValue].push(newQuestion);
        questionCount = retVal[currentValue].questions.length
        return retVal
        }
      else { return retVal[currentValue]}
      });
    console.log(retVal)
    return {...state,...retVal}
    default:
    return state
  }
}

export default combineReducers({
  decks,
  loaded,
//  lastPlayed,
})
