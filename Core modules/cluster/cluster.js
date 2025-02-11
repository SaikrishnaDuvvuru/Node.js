const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length; // Get the number of CPU cores available

// If this is the master process
if (cluster.isMaster) {
  console.log(`Master process started with PID: ${process.pid}`);
  
  // Fork worker processes for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit (if any worker crashes)
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Spawning a new worker.`);
    cluster.fork(); // Fork a new worker to replace the dead one
  });
} else {
  // Worker processes: each worker will handle HTTP requests
  http.createServer((req, res) => {
    // Simulate some computationally heavy task (e.g., database query, file processing)
    setTimeout(() => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Hello from Worker Process: ${process.pid}`);
    }, Math.random() * 1000); // Simulate random processing time
  }).listen(8000);

  console.log(`Worker process ${process.pid} started`);
}
