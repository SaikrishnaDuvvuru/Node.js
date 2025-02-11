
// used inside cluster.js to create worker processes for each CPU core.



// fork() is used to create a new child Node.js process. It is useful when you want to spawn a separate Node.js script to execute and 
// communicate with the parent process via message-passing.