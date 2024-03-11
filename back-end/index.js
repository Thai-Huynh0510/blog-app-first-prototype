const express = require('express')
const cors = require('cors')
require('./db/index')
const app = express()
const blogRouter = require('./route/routes')
app.use(cors())
app.use(express.json())
app.use('/api/v1/blogs', blogRouter)
app.use('/api/v1/', (req,res) => {
    res.send('hello')
})

app.listen(5000, ()=> console.log('app listening to port 5000'))