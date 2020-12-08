const express = require('express')
const dotenv = require('dotenv');
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

// Make .env accessible
dotenv.config();

const app = express()

// Body parser middleware
app.use(bodyParser.json())

// Telling who is sending the push notification
const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

// Subscribe Route
app.post('/subscribe', (req, res) => {
    // Get pushSubscription object
    const subsription = req.body

    // Send 201 - Resource created successfully
    res.status(201).json({})

    // Create payload
    const payload = JSON.stringify({ title: 'Push Test'})

    // Pass object into sendNotificiation
    webpush.sendNotification(subsription, payload).catch(err => {
        console.log(err)
    })   
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})