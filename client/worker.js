console.log('Service worker loaded...')

self.addEventListener('push', event => {
    const data = event.data.json()
    console.log('The push has been recieved...')
    self.registration.showNotification(data.title, {
        body: 'Notified by Daniel!',
        icon: 'https://www.brandcrowd.com/maker/logo/chocolate-chip-cookie-biscuit-126086'
    })
})