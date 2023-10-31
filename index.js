const express = require('express')
const dotenv = require('dotenv')
const cors=require('cors')
const app = express()
const cookieParser = require('cookie-parser')
const connection=require('./database/db')
dotenv.config()
const route = require('./router/router')
const corsOption={
    origin:"*"
}
app.use(cors(corsOption));
app.use(express.json())
app.use(route)

app.use(cookieParser())
connection()
const PORT = 8000
app.listen(PORT, () => {
    console.log(`you are runnign on port ${PORT}`)
})