import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

var NOTIFICATION_KEY = '@mobile-flashcardsNotification';

export function clearLocalNotifications(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function getCurrentNotification(){
  return AsyncStorage.getItem(NOTIFICATION_KEY, (result) => {
    console.log(JSON.parse(result))
    return JSON.parse(result)
  })
}

function createNotification(){
    return {
      title:"Don't forget to practice!",
      body:"Don't forget to practice with a quiz today",
      ios: {
        sound:true,
      },
      android: {
        sound:true,
        priority:'high',
        sticky: false,
        vibrate: true,
      }
    }
  }


export function setLocalNotification(){
  console.log("in set local notification")
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    console.log("Currently set next alert")
    console.log(data)
    //figure out tomorrows date at 8 pm
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)
    tomorrow.setHours(20)
    tomorrow.setMinutes(0)
    let currentSetDate = new Date(data)
    let daysApart =  tomorrow.getDate()-currentSetDate.getDate()
    console.log("days between tomorrow and next alert")
    console.log(daysApart)
    console.log(tomorrow.getHours())
    let currentDateTime = new Date()
    let currentHours = currentDateTime.getHours()
    //determine if last notification time was past or not set
    //and set notififcation for tommorow
    if (data === null){
      console.log("got null")
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({status}) => {
        if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()
        Notifications.scheduleLocalNotificationAsync(
          createNotification(),
          {
            time: tomorrow,
            repeat: 'day',
          }
        )
        return AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(tomorrow))
      }
    }
  )}
  })

}
