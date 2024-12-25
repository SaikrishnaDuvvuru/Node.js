const util = require('util');

// 1. Using util.format() for formatting strings
const name = 'John';
const greeting = util.format('Hello, %s!', name);
console.log(greeting);  // Output: Hello, John!


// 2. Using util.inspect() for inspecting an object
const obj = {
    name: 'Alice',
    age: 25,
    address: {
        city: 'New York',
        state: 'NY',
        postalCode: {
            code: '10001',
            country: 'USA'
        }
    }
}

console.log(util.inspect(obj, { depth: 2, colors: true }));


// 3. Using util.promisify() to convert a callback function to a promise-based function
const fs = require('fs');
const readFile = util.promisify(fs.readFile);
readFile('sample.txt', 'utf8').then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
});