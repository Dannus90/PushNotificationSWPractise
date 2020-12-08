const express = require('express')
const dotenv = require('dotenv');
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

// Make .env accessible
dotenv.config();

const app = express()

const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY