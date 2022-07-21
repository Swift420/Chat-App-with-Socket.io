const express = require('express');
const dotenv = require('dotenv')
const { chats } = require('./data/data');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const cors = require('cors')

dotenv.config();
connectDB()

const app = express();

app.use(express.json());


app.use(cors())


app.use("/api/user", userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=> {
    console.log(`listening on port ${PORT}`)
})