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
        vibrate, True,
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
        tomorrow.setDate(tommorow.getDate() + 1)
        tomorrow.setHour(20)
        tomorrow.setMinutes(0)

        Notificatinos.scheduleLocalNotificationAsync(
          createNotification(),
          {
            time:tomorrow,
            repeate: 'day',
          }
        )
        AsyncStorage.setItem(NOTIFICATION_KEY,JSON.Stringify(true))
      }
    }
  )}
}
)}
