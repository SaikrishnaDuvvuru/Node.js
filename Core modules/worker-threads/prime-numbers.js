const { Worker, isMainThread, parentPort } = require('worker_threads');
const os = require('os');

// Function to calculate prime numbers up to a given number
function calculatePrimes(limit) {
  let primes = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  return primes;
}

// Helper function to check if a number is prime
function isPrime(num) {
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

// Main thread
if (isMainThread) {
  const numCPUs = os.cpus().length; // Number of available CPU cores
  const limit = 1000000; // Limit for prime number calculation
  const chunkSize = Math.floor(limit / numCPUs); // Divide work into chunks based on CPU count
  console.log(chunkSize)

  console.log(`Dividing task into ${numCPUs} chunks`);

  let workers = [];
  let results = [];

  // Create a worker for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    const start = i * chunkSize + 1;
    const end = (i + 1) * chunkSize;

    // Send the chunk of work to each worker
    workers[i] = new Worker(__filename);
    workers[i].postMessage({ start, end });

    workers[i].on('message', (msg) => {
      console.log(`Worker ${i + 1} finished.`);
      results = results.concat(msg.primes);
    //   console.log(results);
      if (i+ 1 === numCPUs) {
        console.log('All workers finished.');
        console.log('Total primes found:', results.length);
      } else {
        console.log('Total primes found so far:', results.length);
      }
    });
  }
} else {
  // Worker thread: Process a chunk of the task
  parentPort.on('message', (data) => {
    const primes = calculatePrimesInRange(data.start, data.end);
    parentPort.postMessage({ primes });
  });

  function calculatePrimesInRange(start, end) {
    let primes = [];
    for (let i = start; i <= end; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    return primes;
  }
}
