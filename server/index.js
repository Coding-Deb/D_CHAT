const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 5000
const http = require('http');
const socketIo = require('socket.io');


// MongoDB Connection
mongoose.connect('mongodb+srv://debanshu1234:debanshu1234@cluster0.mswzdgw.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle real-time events here
  // Example: socket.on('someEvent', (data) => { /* Handle event */ });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const authRoutes = require('./Routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))