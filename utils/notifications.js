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

  //used to update notifications after quiz is completed
  export function setLocalNotificationForTomorrow(){
      let tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate()+1)
      tomorrow.setHours(20)
      tomorrow.setMinutes(0)
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
      })
  }

export function setLocalNotification(){
  console.log("in set local notification")
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
   //figure out tomorrows date at 8 pm
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)
    tomorrow.setHours(20)
    tomorrow.setMinutes(0)
    //if no notification was set, setup notifications
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
