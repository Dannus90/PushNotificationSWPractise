const publicVapidKey = "BAhuOU5c065AFyDaZdpwA41sx2Hqy8m0ei5zHHlMQ7ynoPvTmmjhESvGyvn4swOhk4sVWtvqYzl0voKCgxMUEmw"

// Check for service worker
if('serviceWorker' in navigator) {
    send().catch(err => {
        console.error(err)
    })
}

// Register the service worker, Register push, Send push
async function send() {
    // Register service worker
    console.log('Registering service worker...')
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    })
    console.log('Service Worker Registered...')

    // Register push
    console.log(('Registering push'))
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log('Push Registered...')

    // Send Push Notification
    console.log('Sending Push...')
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
    console.log('Push Sent...')
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }