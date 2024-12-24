const fs = require('fs');
const path = require('path');


// Writing file asynchronously

const filePath = path.join(__dirname, '..', 'sample-data.txt');  // '..' goes one level up from 'readfile'
// _dirname is the directory name of the current module

console.log('Resolved file path:', filePath);  // Log the full path for debugging

const inputData = 'Writing File Asynchronously';

fs.writeFile(filePath, inputData, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('File written successfully');
});



// writing file synchronously  

const data = 'Writing File Synchronously';
fs.appendFile(filePath, data);
console.log('File written successfully');



// To add data to an existing file, we can use the fs.appendFile() method.

// appending File asynchronously

const appendData = 'Appending File Asynchronously';
fs.appendFile(filePath, appendData, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('File appended successfully');
});


// appending file synchronously

const appendDataSync = 'Appending File Synchronously';
fs.appendFileSync(filePath, appendDataSync);
console.log('File appended successfully');   