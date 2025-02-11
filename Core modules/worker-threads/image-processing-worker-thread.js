const http = require('http');
const fs = require('fs');
const path = require('path');
const { Worker } = require('worker_threads');

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  if (req.url === '/process-image') {
    // Send the request to the worker thread for processing the image
    const worker = new Worker(path.resolve(__dirname, 'image-processor.js'));
    
    // Listen for messages from the worker (processed image result)
    worker.on('message', (result) => {
      // Send the processed image back to the client
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(result);
    });

    // Listen for errors from the worker thread
    worker.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error processing the image: ' + err.message);
    });

    // Pass the image path to the worker
    worker.postMessage('input-image.jpg');
  } else {
    // Handle other requests (simple fallback)
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
