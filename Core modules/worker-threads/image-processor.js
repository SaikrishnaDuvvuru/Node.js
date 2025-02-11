const sharp = require('sharp');
const { parentPort } = require('worker_threads');

// Listen for a message (path to the image)
parentPort.on('message', (imagePath) => {
  const inputPath = './' + imagePath;
  const outputPath = './output-image.jpg';

  // Perform image processing using sharp (resize the image)
  sharp(inputPath)
    .resize(300, 300) // Resize to 300x300 pixels
    .toBuffer() // Get the output as a buffer
    .then((data) => {
      // Send the processed image back to the main thread
      parentPort.postMessage(data);
    })
    .catch((err) => {
      parentPort.postMessage('Error: ' + err.message);
    });
});
