/**
 * Class containing static utility functions for displaying notifications. (This
 * could just as well be a simple object.)
 *
 * @class Notifier
 */
export default class Notifier {
  /**
   * Request notification permission if browser supports it.
   *
   * @static
   * @memberof Notifier
   */
  static requestPermissions() {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }
  
  /**
   * Display notification message in system tray. If notifications are not
   * supported (e.g. older browser or browsing locally with `file://`) or we
   * don't have appropriate permissions, use `console.log`.
   * 
   * `npx serve` or similar can be used to serve the HTML locally with support
   * for Notification API.
   * 
   * @static
   * @param {string} message Message to display
   * @memberof Notifier
   */
  static notify(message) {
    // Check if notifications are supported and we were granted permission
    if (('Notification' in window) && Notification.permission === 'granted') {
      new Notification(message)
    } else {
      console.log(`NOTIFICATION: ${message}`)
    }
  }
}