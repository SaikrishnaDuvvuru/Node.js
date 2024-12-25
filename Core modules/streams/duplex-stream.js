const net = require('net');

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('Client connected.');

  // When the server receives data from the client
  socket.on('data', (data) => {
    console.log('Received from client:', data.toString());

    // Send data back to the client (duplex communication)
    socket.write('Hello from server!');
  });

  // Handle connection end
  socket.on('end', () => {
    console.log('Client disconnected.');
  });

  // Handle any error
  socket.on('error', (err) => {
    console.error('Socket error:', err);
  });
});

// Server listens on port 8080
server.listen(8080, () => {
  console.log('Server is listening on port 8080');
});





// Create a TCP client
const client = net.createConnection({ port: 8080 }, () => {
  console.log('Connected to server!');
  
  // Send data to the server
  client.write('Hello from client!');
});

// Handle data received from the server
client.on('data', (data) => {
  console.log('Received from server:', data.toString());

  // End the connection after receiving a response
  client.end();
});

// Handle connection end
client.on('end', () => {
  console.log('Disconnected from server');
});

// Handle errors
client.on('error', (err) => {
  console.error('Client error:', err);
});



// TCP is one of the real-time examples for duplex streams

// TCP is a reliable, connection-oriented, and full-duplex transport layer protocol. 
// It ensures reliable data transmission through a three-way handshake, error detection, 
// retransmission of lost data, flow control, and congestion control mechanisms. 