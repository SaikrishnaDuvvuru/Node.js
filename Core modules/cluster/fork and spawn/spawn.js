const { spawn } = require('child_process');

// Use spawn to run the 'ls' command to list files in the current directory
const ls = spawn('ls', ['-l', '/usr']);  // List files in the /usr directory

// Handling stdout
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Handling stderr
ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Handling exit event
ls.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});





// spawn() is used to run external commands like shell commands,
// utilities, or scripts. It is more suitable for scenarios where you need to run commands that interact with the system 
//(e.g., listing files, calling system utilities, etc.).