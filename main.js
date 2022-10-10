const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = require('./Routes/Router')
const path = require('path')
const http = require('http').createServer(app)
const io = require('socket.io')(http);

let port = process.env.port || 5000
http.listen(port , ()=>{
	console.log('localhost 5000')
})

io.on('connection', socket=>{
    socket.on('message', (msg)=>{
    	socket.broadcast.emit('message',msg)
    })
    socket.on('join' , (msg)=>{
    	socket.broadcast.emit('join' , msg)
    })
    

})



app.use(bodyParser.urlencoded({ extended: false }))
app.use(router);

