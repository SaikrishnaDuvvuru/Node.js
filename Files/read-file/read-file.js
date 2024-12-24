const fs = require('fs');
const path = require('path');


// reading file asynchronously

const filePath = path.join(__dirname, '..', 'sample-data.txt');  // '..' goes one level up from 'readfile'
console.log('Resolved file path:', filePath);  // Log the full path for debugging

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
   
    console.log(data);

 });


 // reading file synchronously

 const data = fs.readFileSync('user-data.txt', 'utf8');
 console.log(data);




// here utf-8 is the encoding of the file where the file is read in the form of string.

// In Node.js, a Buffer is a built-in object that provides a way to work with raw binary data directly in memory, 
// without needing to convert it to a string or an array. 
// Buffers are particularly useful for handling I/O operations, 
// such as reading from a file, communicating over a network, or interacting with binary data formats.


//The path module in Node.js is used to handle and manipulate file and directory paths. 
//It provides utilities for working with paths in a way that is platform-independent,
// making it easier to work with file paths across different operating systems (Windows, macOS, Linux). 
//The path module simplifies operations such as joining, resolving and normalizing paths, 
//ensuring that your code works correctly regardless of the file system.