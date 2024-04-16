const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fetch = require('node-fetch'); // Import fetch module

async function getUserName() {
  const url = 'http://localhost:5000/users'; // Assuming the endpoint for getting user details is '/users'
  try {
      const response = await fetch(url, {
          method: 'GET', // Change method to GET
          headers: {
              'Content-Type': 'application/json'
          }
      });
      console.log('Response status:', response.status); // Log the response status
      if (response.ok) {
          const userData = await response.json();
          console.log('User Data:', userData); // Log the userData object
          const userName = userData[0].name; // Assuming the response contains user data with a 'name' field
          console.log('User Name:', userName);
          return userName; // Return the userName value
      } else {
          console.log('Error getting user name');
          return null; // Return null or handle error case appropriately
      }
  } catch (error) {
      console.error('Error fetching user name:', error);
      return null; // Return null or handle error case appropriately
  }
}




app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index'); // Render a homepage or default room
});

app.get('/:room', async (req, res) => {
    const roomId = req.params.room;
    try {
        const userName = await getUserName();
        res.render('room', { roomId, userName });
    } catch (error) {
        console.error('Error getting user name:', error);
        res.status(500).send('Error getting user name');
    }
});

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        });
    });
});

async function startServer() {
    try {
        await getUserName();
        server.listen(3001);
        console.log('Server is running on port 3001');
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer();
