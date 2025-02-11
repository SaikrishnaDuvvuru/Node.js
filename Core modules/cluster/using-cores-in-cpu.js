const cluster = require('cluster');
const os = require('os');
const http = require('http');

const numCPUs = os.cpus().length; // Get the number of available CPU cores

// Define the operations you want to perform on each core
const operation1 = () => {
  console.log(`Worker 1: Performing operation 1`);
  // Simulate a task (e.g., CPU-heavy calculation)
  setTimeout(() => {
    console.log('Worker 1 is calculating something...');
  }, 1000);
 
};

const operation2 = () => {
  console.log(`Worker 2: Performing operation 2`);
  // Simulate a task (e.g., serving HTTP requests)
  setTimeout(() => {
    console.log('Worker 2 is handling HTTP requests...');
  }, 1000);
};

if (cluster.isMaster) {
  console.log(`Master process started with PID: ${process.pid}`);

  // Fork only 2 workers (since we only want to use 2 cores)
  cluster.fork();
  cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`);
  });
} else {
  const workerId = cluster.worker.id;  // Get the worker ID for logging purposes
  console.log(workerId)


  if (workerId === 1) {
    // Worker 1: Execute operation 1
    operation1();
  } else if (workerId === 2) {
    // Worker 2: Execute operation 2
    operation2(); // Worker 2 exits after finishing its task
  }

  // Workers can also run an HTTP server, for example
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Handled by Worker ${workerId} (PID: ${process.pid})`);
  }).listen(8000, () => {
    console.log(`Worker ${workerId} started and listening on port 8000`);
  });
}