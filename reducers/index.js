import { combineReducers } from 'redux'

import {
  ADD_DECKS,
  SET_DECKS,
  SET_LOADED,
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
    //console.log("in add_decks")
    return {
      ...state,...action.data
    }
    default:
    return state
  }
}

export default combineReducers({
  decks,
  loaded,
//  lastPlayed,
})
