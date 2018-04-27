const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

const {
    userRouter: users
} = require('./routes')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

// Routes
// app.use('/api/users', users)
// app.use('/api/features', features)


app.use((req, res) => {
    const status = 404
    const message = `Could not ${req.method} ${req.path}`
    res.status(status).json({ status, message })
});

app.use((err, _req, res, _next) => {
    console.error(err)
    const status = err.status || 500
    const message = err.message || 'Something went wrong!'
    res.status(status).json({ message, status })
})

app.listen(port, () => {
    console.log('listening on port', port)
})
