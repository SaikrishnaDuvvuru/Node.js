function greetListener() {
    console.log('Hello there!');
}

myEmitter.on('greet', greetListener); // listens for the event greet
myEmitter.emit('greet'); // emits the event greet

myEmitter.once('greet', greetListener); // listens for the event greet only once and then removes the listener

// Remove the listener
myEmitter.removeListener('greet', greetListener);
myEmitter.emit('greet'); // No output, listener is removed
