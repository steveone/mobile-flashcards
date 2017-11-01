import { AsyncStorage } from 'react-native'

var STORAGE_KEY = '@mobile-flashcards';


export function getDecks(){
  return AsyncStorage.getItem('@mobile-flashcards', (result) => {
    return JSON.parse(result)
  })
}


export function removeDecks(){
  return AsyncStorage.removeItem('@mobile-flashcards', (result) => {
    return JSON.parse(result)
  })
}

export function updateDecks(decks){
  console.log("in updatedecks")
  console.log(decks)
  console.log("that was the update above")
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
}

export function submitEntry({ entry, key}){

  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
    [key]: entry,
  }))

}

export function removeEntry(key){
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) =>{
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsynStorage.setItems(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}

export function loadDefaultDecks(){
  updateDecks(this.defaultDecks)
}

const defaultDecks = {
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
}
