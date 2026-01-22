const http = require('http');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const app = require('./src/app');
const connectDB = require('./src/config/db');

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || '*',
  },
});

io.on('connection', (socket) => {
  // Placeholder for real-time notifications
  socket.on('disconnect', () => {});
});

app.set('io', io);

const start = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();


