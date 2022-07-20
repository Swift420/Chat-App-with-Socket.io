const express = require('express');
const dotenv = require('dotenv')
const { chats } = require('./data/data');
const connectDB = require('./config/db')

dotenv.config();
connectDB()
const app = express();



app.get('/api/chat', function(req, res) {
    res.send(chats)
})


const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})