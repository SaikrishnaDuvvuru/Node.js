const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const http = require('http');
const { Transform } = require('stream');

class UpperCaseAndCompressTransform extends Transform {
    constructor() {
        super();
    }

    _transform(chunk, encoding, callback) {
        const upperCaseChunk = chunk.toString().toUpperCase();
        // const compressedData = zlib.gzipSync(upperCaseChunk);

        this.push(upperCaseChunk);
        callback();
    }
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
        const outputFilePath = fs.createWriteStream('uploaded-file.gz');


        req.pipe(new UpperCaseAndCompressTransform()).pipe(outputFilePath);

        req.on('end', () => {
            res.end('File uploaded successfully');
        });



        req.on('error', (err) => {
            console.error('Error uploading file:', err);
            res.statusCode = 500;
            res.end('Error uploading file');
        });
    }
    else {
        res.statusCode = 404;
        res.end('Not found');
    }

});


// fs.createReadStream('uploaded-file.gz')
//   .pipe(zlib.createGunzip())
//   .on('data', (chunk) => {
//     console.log(chunk.toString());  // Output the decompressed content
//   });



server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});



// Transform streams are a type of duplex stream that allow you to modify or transform the data as it passes through the stream.