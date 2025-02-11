const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename);
    worker.on('message', (msg) => {
        console.log('Message from worker:', msg);
    });
    worker.postMessage('Start computation');
}

else {
    parentPort.on('message', (msg) => {
    console.log('Worker received:', msg);
    let result = 'Computation finished';
    parentPort.postMessage(result); // Send result back to main thread
    });
}
