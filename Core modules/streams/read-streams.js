const fs = require('fs');
const path = require('path');

// Create a readable stream for a file
    const readableStream = fs.createReadStream(path.join(__dirname, '..', 'user-data.txt'), 
        {
            encoding: 'utf8',
            highWaterMark: 1 * 1024 // Read in 1 KB chunks
            // highWaterMark: 10 * 1024 * 1024 // Read in 10 MB chunks
        }
    );

// Listen for the 'data' event and process the chunks of data
readableStream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});

// Listen for the 'end' event when the stream has finished reading
readableStream.on('end', () => {
    console.log('Finished reading file');
});

// Handle any errors that occur
readableStream.on('error', (err) => {
    console.error('Error reading file:', err);
});



// Chunk Size: The chunk size determines how much data is read from the file at once. 
// By default, the highWaterMark for a readable stream is 64 KB (65536 bytes), but you can change it if needed. 
// This means the stream will read data in 64 KB chunks unless you specify otherwise.








// In Node.js, streams are a powerful and efficient way to handle large amounts of data, 
//allowing you to read or write data in small chunks rather than all at once. 

