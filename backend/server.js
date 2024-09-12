const dotenv = require('dotenv'); // Import dotenv to load environment variables
const http = require('http'); // Import http to create the server
const app = require('./app'); // Import the Express app
const { initializeSocket } = require('./socket'); // Import socket initialization
const connect_Database = require('./config/database'); // Import the database connection
const express = require('express'); // Import Express
const path = require('path'); // Import path for handling file paths
// Load environment variables
dotenv.config({ path: 'backend/config/config.env' });

// Connect to the database
connect_Database();
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build' ,'index.html'));
});
// Create the HTTP server
const server = http.createServer(app);

// Initialize socket with the created server
initializeSocket(server);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
