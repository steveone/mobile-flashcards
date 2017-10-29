import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

var NOTIFICATION_KEY = '@mobile-flashcardsNotification';

export function clearLocalNotifications(){
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync())
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
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null){
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({status}) => {
        if (status === 'granted') {
        Notifications.cancelAllScheduledNotificationsAsync()

        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate())
        tomorrow.setHours(20)
        tomorrow.setMinutes(0)
        Notifications.scheduleLocalNotificationAsync(
          createNotification(),
          {
            time: tomorrow,
            repeat: 'day',
          }
        )
        AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
      }
    }
  )}
  })
}
