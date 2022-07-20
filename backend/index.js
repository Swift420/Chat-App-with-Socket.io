const express = require('express');
const dotenv = require('dotenv')
const { chats } = require('./data/data');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')


dotenv.config();
connectDB()
const app = express();



app.use("/api/user", userRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})