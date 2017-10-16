import { Asyncstorage } from 'react-native'

export function getDecksFromAPI(key){
return AsyncStorage.getItem(STORAGE_KEY)
.then((results) =>{
  //console.log("in getDecks)")
  //console.log(JSON.parse(results))
  return results //JSON.parse(results)
});
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
