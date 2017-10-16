import { combineReducers } from 'redux'

import {
  ADD_DECKS,
  SET_DECKS,
} from '../actions/types'

const initialQuestions = null;

const lastPlayed = {
  /*lastPlayed*/
}

function decks (state = {}, action) {
console.log("in reducer")
console.log(action)
  switch (action.type) {
    case SET_DECKS:
      return {
        ...state, ...action
      }

    case ADD_DECKS:
    console.log("in add_decks")
    return {
      ...state,...action.decks
    }
    default:
    return state
}
}

export default combineReducers({
  decks,
//  lastPlayed,
})
