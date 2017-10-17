import { AsyncStorage } from 'react-native'

var STORAGE_KEY = '@mobile-flashcards';


/*export function getDecksFromAPI(){
  AsyncStorage.getItem(STORAGE_KEY, (err,result) =>{
    if (result !== null){
      let data = JSON.parse(result);
      return data;
    }
    else {
      console.log("no data found")
    }
  })
}*/


export function getDecks(){
  return AsyncStorage.getItem('@mobile-flashcards', (result) => {
    return JSON.parse(result)
  })
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
