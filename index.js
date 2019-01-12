const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  console.log(`User Connected in sockect ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User Disconnect in sockect ${socket.id}`)
  })

  socket.on('chat message', msg => {
    console.log(`Message: "${msg}" from ${socket.id}`)
    const resMsg = `socket ${socket.id} said: "${msg}"`
    const ackFunciton = ackMsg => {
        console.log(`${ackMsg} from ${socket.id}`)
    }
    socket.emit('chat message', resMsg, ackFunciton) // send message only to this socket
    // io.emit('chat message', resMsg) // send resMsg to all sockets
    // socket.broadcast.emit('chat message', resMsg) // send resMsg to all sockets (except this one)
  })

})

http.listen(3000, () => {
  console.log('listening on *:3000')
})