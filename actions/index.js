import getDecksFromAPI from '../utils/api'

import {
  ADD_DECKS ,
  SET_DECKS,
} from './types';

export const getDecks = (key) => dispatch =>(
  getDecks(key)
  //.getCategories()
  //.then(categories => (console.log(categories)))
  .then(data => dispatch(ADD_DECKS(data)
      )
    )
  )

  export const setDecks = (key) => dispatch =>(
        dispatch(SET_DECKS())

        )
