const fs = require('fs');
const path = require('path');

// Create a writable stream to write to a file
const writableStream = fs.createWriteStream(path.join(__dirname, '..', 'user-data.txt'), 'utf8');

// Write data to the file
writableStream.write('Hello, this is the first line of data!\n');
writableStream.write('This is the second line of data.\n');

// End the stream (close the file)
writableStream.end(() => {
    console.log('Finished writing to file.');
});

// Optionally, handle the 'finish' event
writableStream.on('finish', () => {
    console.log('Data has been fully written!');
});

// Handle any errors
writableStream.on('error', (err) => {
    console.error('Error writing to file:', err);
});
